import { Test, TestingModule } from '@nestjs/testing';
import { TransportAppsController } from './transport-apps.controller';

describe('TransportAppsController', () => {
  let controller: TransportAppsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransportAppsController],
    }).compile();

    controller = module.get<TransportAppsController>(TransportAppsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
