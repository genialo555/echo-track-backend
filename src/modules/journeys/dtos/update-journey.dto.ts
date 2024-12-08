// src/modules/journeys/dtos/update-journey.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateJourneyDto } from './create-journey.dto';

export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {
}