import { Test, TestingModule } from '@nestjs/testing';
import { TransportAppsService } from './transport-apps.service';

describe('TransportAppsService', () => {
  let service: TransportAppsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransportAppsService],
    }).compile();

    service = module.get<TransportAppsService>(TransportAppsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
