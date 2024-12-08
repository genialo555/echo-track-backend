import { Module } from '@nestjs/common';
import { ChallengesLeaderboardsModule } from './challenges-leaderboards/challenges-leaderboards.module';
import { ChallengesLeaderboardsController } from './challenges-leaderboards.controller';
import { ChallengesLeaderboardsService } from './challenges-leaderboards.service';
import { ShareJourneysModule } from './share-journeys/share-journeys.module';
import { ShareJourneysController } from './share-journeys.controller';
import { ShareJourneysService } from './share-journeys.service';

@Module({
  imports: [ChallengesLeaderboardsModule, ShareJourneysModule],
  controllers: [ChallengesLeaderboardsController, ShareJourneysController],
  providers: [ChallengesLeaderboardsService, ShareJourneysService]
})
export class SocialModule {}
