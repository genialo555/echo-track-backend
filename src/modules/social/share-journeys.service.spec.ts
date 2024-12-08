import { Test, TestingModule } from '@nestjs/testing';
import { ShareJourneysService } from './share-journeys.service';

describe('ShareJourneysService', () => {
  let service: ShareJourneysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShareJourneysService],
    }).compile();

    service = module.get<ShareJourneysService>(ShareJourneysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
