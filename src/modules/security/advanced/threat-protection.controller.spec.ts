import { Test, TestingModule } from '@nestjs/testing';
import { ThreatProtectionController } from './threat-protection.controller';

describe('ThreatProtectionController', () => {
  let controller: ThreatProtectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreatProtectionController],
    }).compile();

    controller = module.get<ThreatProtectionController>(ThreatProtectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
