// src/auth/dto/register.dto.ts
import { 
  IsString, 
  IsEmail, 
  MinLength, 
  MaxLength, 
  Matches, 
  IsOptional, 
  IsEnum 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from 'src/database/common/enums/role.enum';
import { AuthProvider } from 'src/database/common/enums/auth-provider.enum';

/**
 * DTO pour l'inscription des utilisateurs.
 */
export class RegisterDto {
  @ApiProperty({ example: 'username', description: 'Nom d\'utilisateur unique.' })
  @IsString()
  @MinLength(3, { message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères.' })
  @MaxLength(20, { message: 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères.' })
  username: string;

  @ApiProperty({ example: 'user@example.com', description: 'Adresse email unique de l\'utilisateur.' })
  @IsEmail({}, { message: 'Adresse email invalide.' })
  @MaxLength(50, { message: 'L\'adresse email ne peut pas dépasser 50 caractères.' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'Mot de passe sécurisé.' })
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @MaxLength(32, { message: 'Le mot de passe ne peut pas dépasser 32 caractères.' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}/, {
    message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
  })
  password: string;

  @ApiPropertyOptional({ enum: Role, example: Role.USER, description: 'Rôle de l\'utilisateur.' })
  @IsOptional()
  @IsEnum(Role, { message: 'Rôle utilisateur invalide.' })
  role?: Role;

  @ApiPropertyOptional({ example: false, description: 'Indique si l\'email est confirmé.' })
  @IsOptional()
  isEmailConfirmed?: boolean;

  @ApiPropertyOptional({ example: 'uuid-string', description: 'Token de confirmation pour l\'email.' })
  @IsOptional()
  confirmationToken?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59.999Z', description: 'Date d\'expiration du token de confirmation.' })
  @IsOptional()
  confirmationTokenExpires?: Date;

  @ApiPropertyOptional({ example: true, description: 'Indique si le compte est actif.' })
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ enum: AuthProvider, example: AuthProvider.LOCAL, description: 'Fournisseur d\'authentification.' })
  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;
}
