import { Test, TestingModule } from '@nestjs/testing';
import { ChallengesLeaderboardsService } from './challenges-leaderboards.service';

describe('ChallengesLeaderboardsService', () => {
  let service: ChallengesLeaderboardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChallengesLeaderboardsService],
    }).compile();

    service = module.get<ChallengesLeaderboardsService>(ChallengesLeaderboardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
