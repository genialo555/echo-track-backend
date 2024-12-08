// backend/src/modules/users/dtos/get-user.dto.ts
import { 
    IsEmail, 
    IsEnum, 
    IsOptional, 
    IsString, 
    IsUUID, 
    IsBoolean, 
    IsDate 
  } from 'class-validator';
  import { Role } from '../../../database/common/enums/role.enum';
  import { AuthProvider } from '../../../database/common/enums/auth-provider.enum';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  /**
   * DTO pour la récupération des informations d'un utilisateur.
   */
  export class GetUserDto {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsUUID()
    id?: string;
  
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email?: string;
  
    @ApiProperty({ example: 'username' })
    @IsString()
    username?: string;
  
    @ApiProperty({ enum: AuthProvider, example: AuthProvider.LOCAL })
    @IsEnum(AuthProvider)
    provider?: AuthProvider;
  
    @ApiProperty({ enum: Role, isArray: true, example: [Role.USER] })
    @IsEnum(Role, { each: true })
    roles?: Role[];
  
    @ApiPropertyOptional({ example: 'John' })
    @IsOptional()
    @IsString()
    firstName?: string;
  
    @ApiPropertyOptional({ example: 'Doe' })
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @ApiPropertyOptional({ example: 'profile-images/123e4567-e89b-12d3-a456-426614174000-1630234824.png' })
    @IsOptional()
    @IsString()
    profileImage?: string;
  
    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    isEmailConfirmed?: boolean;
  
    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
  
    @ApiPropertyOptional({ example: '2023-12-31T23:59:59.000Z' })
    @IsOptional()
    @IsDate()
    acceptedTermsExpires?: Date;
  
    @ApiPropertyOptional({ example: '2023-11-21T12:34:56.000Z' })
    @IsOptional()
    @IsDate()
    lastLoginAt?: Date;
  
    @ApiPropertyOptional({ example: '2023-10-01T10:00:00.000Z' })
    @IsOptional()
    @IsDate()
    createdAt?: Date;
  
    @ApiPropertyOptional({ example: '2023-11-01T15:30:00.000Z' })
    @IsOptional()
    @IsDate()
    updatedAt?: Date;
  }
  