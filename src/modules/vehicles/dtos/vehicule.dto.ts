// src/modules/vehicles/dtos/vehicle.dto.ts

import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class VehicleDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID unique du véhicule.' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Toyota', description: 'Marque du véhicule.' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Corolla', description: 'Modèle du véhicule.' })
  @IsString()
  model: string;

  @ApiPropertyOptional({ example: 'Blue', description: 'Couleur du véhicule.' })
  @IsOptional()
  @IsString()
  color?: string;

  // Ajoutez d'autres champs selon vos besoins
}
