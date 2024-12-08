// src/modules/journeys/dtos/create-journey.dto.ts
import { OmitType } from '@nestjs/swagger';
import { JourneyDto } from './journeys.dto';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { LocationPointDto } from './location-point.dto';

export class CreateJourneyDto extends OmitType(JourneyDto, ['id'] as const) {
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