// src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Adresse email de l\'utilisateur.' })
  @IsString()
  @IsNotEmpty({ message: 'L\'email est requis.' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!', description: 'Mot de passe de l\'utilisateur.' })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  password: string;
}
