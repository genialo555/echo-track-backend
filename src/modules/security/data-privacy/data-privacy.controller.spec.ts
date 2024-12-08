import { Test, TestingModule } from '@nestjs/testing';
import { DataPrivacyController } from './data-privacy.controller';

describe('DataPrivacyController', () => {
  let controller: DataPrivacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataPrivacyController],
    }).compile();

    controller = module.get<DataPrivacyController>(DataPrivacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
