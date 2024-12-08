// src/modules/auth/dtos/social-login.dto.ts
import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
import { AuthProvider } from 'src/database/common/enums/auth-provider.enum';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';


export class SocialLoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email from social provider'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    enum: AuthProvider,
    example: AuthProvider.GOOGLE,
    description: 'Social authentication provider'
  })
  @IsEnum(AuthProvider)
  provider!: AuthProvider;

  @ApiProperty({
    example: '12345678',
    description: 'Unique identifier from social provider'
  })
  @IsString()
  providerId!: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Display name from social provider',
    required: false
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  constructor(partial: Partial<SocialLoginDto>) {
    Object.assign(this, partial);
  }
}