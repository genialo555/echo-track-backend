import { IsString, IsNotEmpty, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTermsConditionsDto {
  @ApiProperty({ example: 'v1.0', description: 'Version des termes et conditions' })
  @IsString()
  @IsNotEmpty({ message: 'La version est requise.' })
  version: string;

  @ApiProperty({ example: 'Contenu des termes et conditions...', description: 'Contenu détaillé des termes et conditions' })
  @IsString()
  @IsNotEmpty({ message: 'Le contenu est requis.' })
  content: string;

  @ApiProperty({ example: '2024-01-01T00:00:00Z', description: 'Date d’entrée en vigueur des termes et conditions' })
  @IsISO8601({}, { message: 'La date d’entrée en vigueur doit être une date valide au format ISO.' })
  effectiveDate: string;
}
