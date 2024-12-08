import { Test, TestingModule } from '@nestjs/testing';
import { ThreatProtectionService } from './threat-protection.service';

describe('ThreatProtectionService', () => {
  let service: ThreatProtectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreatProtectionService],
    }).compile();

    service = module.get<ThreatProtectionService>(ThreatProtectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
