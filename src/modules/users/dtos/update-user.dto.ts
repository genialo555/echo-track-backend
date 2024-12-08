// src/modules/users/dtos/update-user.dto.ts

import { 
  IsEmail, 
  IsOptional, 
  IsString, 
  MinLength,
  IsEnum, 
  IsUUID, 
  IsBoolean, 
  IsDate 
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/database/common/enums/role.enum';
import { AuthProvider } from 'src/database/common/enums/auth-provider.enum';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'newusername', description: 'Nouveau nom d\'utilisateur.' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'newemail@example.com', description: 'Nouvelle adresse email.' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newPassword123', description: 'Nouveau mot de passe.', minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.ADMIN, description: 'Nouveau rôle assigné.' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ enum: AuthProvider, example: AuthProvider.GOOGLE, description: 'Nouveau fournisseur d\'authentification.' })
  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;

  @ApiPropertyOptional({ example: 'John', description: 'Nouveau prénom.' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Nouveau nom de famille.' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: 'profile-image.jpg', description: 'Nouveau fichier d\'image de profil.' })
  @IsOptional()
  @IsString()
  profileImage?: string;

  // Ajoutez d'autres champs si nécessaire
}
