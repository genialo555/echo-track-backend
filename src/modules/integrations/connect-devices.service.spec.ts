import { Test, TestingModule } from '@nestjs/testing';
import { ConnectDevicesService } from './connect-devices.service';

describe('ConnectDevicesService', () => {
  let service: ConnectDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectDevicesService],
    }).compile();

    service = module.get<ConnectDevicesService>(ConnectDevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
