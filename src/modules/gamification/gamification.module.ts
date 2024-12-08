import { Module } from '@nestjs/common';
import { GamificationController } from './gamification/gamification.controller';
import { GamificationService } from './gamification/gamification.service';

@Module({
  controllers: [GamificationController],
  providers: [GamificationService]
})
export class GamificationModule {}
