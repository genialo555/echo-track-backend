import { Test, TestingModule } from '@nestjs/testing';
import { JourneyUpdatesService } from './journey-updates.service';

describe('JourneyUpdatesService', () => {
  let service: JourneyUpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneyUpdatesService],
    }).compile();

    service = module.get<JourneyUpdatesService>(JourneyUpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
