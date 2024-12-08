import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { Role } from '../../../database/common/enums/role.enum';
import { AuthProvider } from '../../../database/common/enums/auth-provider.enum';

/**
 * DTO pour créer un utilisateur.
 */
export class CreateUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Nom d’utilisateur unique, alphanumérique, entre 3 et 20 caractères.',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Adresse email valide et unique.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Mot de passe sécurisé.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}/, {
    message: 'Le mot de passe doit être sécurisé.',
  })
  password: string;

  @ApiPropertyOptional({
    enum: Role,
    example: Role.USER,
    description: 'Rôle de l’utilisateur.',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    example: false,
    description: 'Statut de confirmation de l’adresse email.',
  })
  @IsOptional()
  @IsBoolean()
  isEmailConfirmed?: boolean;

  @ApiPropertyOptional({
    example: 'uuid-string',
    description: 'Jeton de confirmation.',
  })
  @IsOptional()
  @IsUUID()
  confirmationToken?: string;

  @ApiPropertyOptional({
    example: '2024-12-31T23:59:59.999Z',
    description: 'Date d’expiration du jeton de confirmation.',
  })
  @IsOptional()
  confirmationTokenExpires?: Date;

  @ApiPropertyOptional({
    example: true,
    description: 'Statut actif ou inactif.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    enum: AuthProvider,
    example: AuthProvider.LOCAL,
    description: 'Fournisseur d’authentification.',
  })
  @IsOptional()
  @IsEnum(AuthProvider)
  provider?: AuthProvider;
}
