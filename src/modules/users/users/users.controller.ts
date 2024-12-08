import { 
  Controller, 
  Get, 
  Put, 
  Body, 
  Req, 
  UseInterceptors, 
  UploadedFile, 
  UseGuards, 
  HttpStatus, 
  ParseFilePipe, 
  MaxFileSizeValidator, 
  FileTypeValidator, 
  Logger, 
  BadRequestException, 
  NotFoundException, 
  InternalServerErrorException,
  HttpCode
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Role } from '../../../database/common/enums/role.enum';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { promises as fs } from 'fs';
import { UserResponseDto } from '../../auth/dtos/user.response.dto';

// Constants
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = /^image\/(jpeg|jpg|png)$/i;
const MAX_MESSAGES = 100;
const MAX_CHAR_LENGTH = 10000;
const DEFAULT_UPLOAD_PATH = 'uploads/profile-images';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    roles: Role[];
  };
}

interface ExtendedUpdateUserDto extends UpdateUserDto {
  messages?: Array<{ 
    id: string;
    content: string;
    timestamp: Date;
  }>;
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  private readonly uploadPath: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.uploadPath = this.configService.get<string>('UPLOAD_PATH') ?? DEFAULT_UPLOAD_PATH;
    this.initializeUploadDirectory().catch(err => {
      this.logger.error('Failed to initialize upload directory', err);
    });
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Profile retrieved successfully',
    type: UserResponseDto 
  })
  async getProfile(@Req() req: RequestWithUser) {
    try {
      const user = await this.usersService.findById(req.user.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.usersService.transformToGetUserDto(user);
    } catch (error) {
      this.handleError('Failed to retrieve profile', error);
    }
  }

  @Put('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update user profile with image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Profile updated successfully',
    type: UserResponseDto
  })
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = DEFAULT_UPLOAD_PATH;
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const fileExt = extname(file.originalname).toLowerCase();
          const userId = (req as any).user?.id;
          const fileName = userId ? 
            `${userId}-${Date.now()}${fileExt}` : 
            `unknown-${Date.now()}${fileExt}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.test(file.mimetype)) {
          return cb(new BadRequestException('Invalid file type. Only JPEG and PNG are allowed.'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: MAX_FILE_SIZE_BYTES },
    }),
  )
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: ExtendedUpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE_BYTES }),
          new FileTypeValidator({ fileType: ALLOWED_MIME_TYPES }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    try {
      const prunedDto = this.pruneMessages(updateUserDto);
      const updatedUser = await this.usersService.updateProfile(req.user.id, prunedDto, file);
      return this.usersService.transformToGetUserDto(updatedUser);
    } catch (error) {
      if (file?.path) {
        await this.removeFile(file.path);
      }
      this.handleError('Failed to update profile', error);
    }
  }

  private async initializeUploadDirectory(): Promise<void> {
    try {
      await fs.mkdir(DEFAULT_UPLOAD_PATH, { recursive: true });
    } catch (error) {
      this.logger.error(`Failed to create upload directory: ${DEFAULT_UPLOAD_PATH}`, error);
      throw error;
    }
  }

  private handleError(message: string, error: unknown): never {
    this.logger.error(message, error instanceof Error ? error.stack : error);
    
    if (error instanceof NotFoundException) {
      throw error;
    }
    if (error instanceof BadRequestException) {
      throw error;
    }
    throw new InternalServerErrorException(message);
  }

  private async removeFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      this.logger.error(`Failed to remove file: ${filePath}`, error);
    }
  }

  private pruneMessages(dto: ExtendedUpdateUserDto): ExtendedUpdateUserDto {
    if (!dto?.messages?.length) {
      return dto;
    }

    const msgLen = dto.messages.length;
    const charLen = JSON.stringify(dto).length;

    if (charLen >= MAX_CHAR_LENGTH || msgLen >= MAX_MESSAGES) {
      const deleteCount = Math.max(1, msgLen - MAX_MESSAGES);
      return {
        ...dto,
        messages: dto.messages.slice(deleteCount)
      };
    }

    return dto;
  }
}