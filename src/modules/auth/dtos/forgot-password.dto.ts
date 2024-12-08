// src/modules/auth/dtos/forgot-password.dto.ts
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Veuillez fournir un email valide.' })
  @IsNotEmpty({ message: 'L\'email est requis.' })
  email: string;
}
