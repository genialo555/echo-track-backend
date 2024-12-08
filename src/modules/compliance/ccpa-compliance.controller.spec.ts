import { Test, TestingModule } from '@nestjs/testing';
import { CcpaComplianceController } from './ccpa-compliance.controller';

describe('CcpaComplianceController', () => {
  let controller: CcpaComplianceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CcpaComplianceController],
    }).compile();

    controller = module.get<CcpaComplianceController>(CcpaComplianceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
