import { Test, TestingModule } from '@nestjs/testing';
import { MarketingCampaignsController } from './marketing-campaigns.controller';

describe('MarketingCampaignsController', () => {
  let controller: MarketingCampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketingCampaignsController],
    }).compile();

    controller = module.get<MarketingCampaignsController>(MarketingCampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
