import { Test, TestingModule } from '@nestjs/testing';
import { CollectDataController } from './collect-data.controller';

describe('CollectDataController', () => {
  let controller: CollectDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectDataController],
    }).compile();

    controller = module.get<CollectDataController>(CollectDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
