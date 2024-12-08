import { Test, TestingModule } from '@nestjs/testing';
import { SyncDataController } from './sync-data.controller';

describe('SyncDataController', () => {
  let controller: SyncDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncDataController],
    }).compile();

    controller = module.get<SyncDataController>(SyncDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
