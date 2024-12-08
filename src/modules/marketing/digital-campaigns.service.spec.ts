import { Test, TestingModule } from '@nestjs/testing';
import { DigitalCampaignsService } from './digital-campaigns.service';

describe('DigitalCampaignsService', () => {
  let service: DigitalCampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalCampaignsService],
    }).compile();

    service = module.get<DigitalCampaignsService>(DigitalCampaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
