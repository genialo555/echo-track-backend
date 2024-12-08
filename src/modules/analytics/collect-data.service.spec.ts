import { Test, TestingModule } from '@nestjs/testing';
import { CollectDataService } from './collect-data.service';

describe('CollectDataService', () => {
  let service: CollectDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectDataService],
    }).compile();

    service = module.get<CollectDataService>(CollectDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
