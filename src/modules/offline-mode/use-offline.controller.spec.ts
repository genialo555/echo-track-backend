import { Test, TestingModule } from '@nestjs/testing';
import { UseOfflineController } from './use-offline.controller';

describe('UseOfflineController', () => {
  let controller: UseOfflineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseOfflineController],
    }).compile();

    controller = module.get<UseOfflineController>(UseOfflineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
