import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneSupportService } from './timezone-support.service';

describe('TimezoneSupportService', () => {
  let service: TimezoneSupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimezoneSupportService],
    }).compile();

    service = module.get<TimezoneSupportService>(TimezoneSupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
