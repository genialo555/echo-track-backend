import { Test, TestingModule } from '@nestjs/testing';
import { DigitalCampaignsController } from './digital-campaigns.controller';

describe('DigitalCampaignsController', () => {
  let controller: DigitalCampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalCampaignsController],
    }).compile();

    controller = module.get<DigitalCampaignsController>(DigitalCampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
