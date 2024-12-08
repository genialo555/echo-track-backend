import { Test, TestingModule } from '@nestjs/testing';
import { ConnectDevicesController } from './connect-devices.controller';

describe('ConnectDevicesController', () => {
  let controller: ConnectDevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectDevicesController],
    }).compile();

    controller = module.get<ConnectDevicesController>(ConnectDevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
