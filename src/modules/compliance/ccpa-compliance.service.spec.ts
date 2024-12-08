import { Test, TestingModule } from '@nestjs/testing';
import { CcpaComplianceService } from './ccpa-compliance.service';

describe('CcpaComplianceService', () => {
  let service: CcpaComplianceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CcpaComplianceService],
    }).compile();

    service = module.get<CcpaComplianceService>(CcpaComplianceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
