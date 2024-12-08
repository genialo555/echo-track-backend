// src/modules/journeys/dtos/journeys.dto.ts
import { IsString, IsUUID, IsDate, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LocationPointDto } from './location-point.dto';

export class JourneyDto {
  @IsUUID()
  id: string;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endTime?: Date;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;

  @IsNumber()
  emissionsCo2: number;

  @IsString()
  startLocation: string;

  @IsString()
  endLocation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationPointDto)
  locationPoints: LocationPointDto[];
}