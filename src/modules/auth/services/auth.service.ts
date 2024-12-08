import { Injectable, UnauthorizedException, InternalServerErrorException, ConflictException, Logger } from '@nestjs/common';
import { UsersService } from '../../users/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../dtos/user.response.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '@/modules/users/entities/user.entity';

interface JwtPayload {
  email: string;
  sub: string;
  role: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await this.usersService.findOne({ 
        email: registerDto.email 
      });

      if (existingUser) {
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }

      const existingUsername = await this.usersService.findOne({ 
        username: registerDto.username 
      });

      if (existingUsername) {
        throw new ConflictException('Ce nom d\'utilisateur est déjà pris');
      }

      // Create new user if checks pass
      const user = await this.usersService.create(registerDto);
      
      // Transform and return user data
      const userResponse = new UserResponseDto(user);
      
      this.logger.log(`Nouvel utilisateur enregistré: ${registerDto.email}`);
      
      return userResponse;

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      // Log the detailed error for debugging
      this.logger.error(
        `Erreur lors de l'inscription: ${registerDto.email}`,
        error instanceof Error ? error.stack : error
      );

      throw new InternalServerErrorException(
        'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      );
    }
  }

  async login(user: UserResponseDto): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      const payload: JwtPayload = {
        email: user.email,
        sub: user.id,
        role: user.role,
      };

      const jwt = this.jwtService.sign(payload);
      
      this.logger.log(`Utilisateur connecté: ${user.email}`);

      return {
        accessToken: jwt,
        expiresIn: 3600, // 1 heure
      };
    } catch (error) {
      this.logger.error(
        `Erreur lors de la connexion: ${user.email}`,
        error instanceof Error ? error.stack : error
      );
      throw new InternalServerErrorException(
        'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
      );
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.usersService.findOne({ email });
      
      if (!user) {
        this.logger.warn(`Tentative de connexion avec un email inexistant: ${email}`);
        return null;
      }

      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        this.logger.warn(`Mot de passe invalide pour l'utilisateur: ${email}`);
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error(
        `Erreur lors de la validation de l'utilisateur: ${email}`,
        error instanceof Error ? error.stack : error
      );
      throw new UnauthorizedException('Identifiants invalides');
    }
  }

  private handleError(message: string, error: unknown): void {
    this.logger.error(
      message,
      error instanceof Error ? error.stack : error
    );
  }
}