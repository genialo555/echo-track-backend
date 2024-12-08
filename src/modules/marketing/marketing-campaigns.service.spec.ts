import { Test, TestingModule } from '@nestjs/testing';
import { MarketingCampaignsService } from './marketing-campaigns.service';

describe('MarketingCampaignsService', () => {
  let service: MarketingCampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketingCampaignsService],
    }).compile();

    service = module.get<MarketingCampaignsService>(MarketingCampaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
