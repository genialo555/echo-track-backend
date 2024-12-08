// src/modules/journeys/dtos/location-point.dto.ts
import { IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// DTO pour la création/mise à jour des points de localisation
export class LocationPointDto {
  @ApiProperty({
    example: 48.8566,
    description: 'Latitude du point'
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: 2.3522,
    description: 'Longitude du point'
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: 100,
    description: 'Altitude en mètres',
    required: false
  })
  @IsOptional()
  @IsNumber()
  altitude?: number;

  @ApiProperty({
    example: 30,
    description: 'Vitesse en km/h',
    required: false
  })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiProperty({
    example: '2024-01-01T12:00:00Z',
    description: 'Horodatage du point'
  })
  @IsDate()
  @Type(() => Date)
  timestamp: Date;
}

// DTO pour la réponse incluant l'ID et les relations
export class LocationPointResponseDto extends LocationPointDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID unique du point de localisation'
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID du trajet associé'
  })
  journeyId: string;
}