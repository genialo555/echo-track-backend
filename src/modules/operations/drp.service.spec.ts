import { Test, TestingModule } from '@nestjs/testing';
import { DrpService } from './drp.service';

describe('DrpService', () => {
  let service: DrpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrpService],
    }).compile();

    service = module.get<DrpService>(DrpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
