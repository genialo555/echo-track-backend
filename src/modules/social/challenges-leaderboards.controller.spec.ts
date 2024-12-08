import { Test, TestingModule } from '@nestjs/testing';
import { ChallengesLeaderboardsController } from './challenges-leaderboards.controller';

describe('ChallengesLeaderboardsController', () => {
  let controller: ChallengesLeaderboardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengesLeaderboardsController],
    }).compile();

    controller = module.get<ChallengesLeaderboardsController>(ChallengesLeaderboardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
