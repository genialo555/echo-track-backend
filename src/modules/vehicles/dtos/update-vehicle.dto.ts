import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsString, IsOptional, IsNumber, Min, MaxLength, IsUrl } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(1886) // First production automobile was in 1886
  year?: number;

  @IsOptional()
  @IsString()
  @MaxLength(17) // Standard VIN length
  vin?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  licensePlate?: string;

  @IsOptional()
  @IsString()
  registrationState?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  imageUrls?: string[];
}