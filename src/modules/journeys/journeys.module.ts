import { Module } from '@nestjs/common';
import { JourneysController } from './journeys/journeys.controller';
import { JourneysService } from './journeys/journeys.service';

@Module({
  controllers: [JourneysController],
  providers: [JourneysService]
})
export class JourneysModule {}
