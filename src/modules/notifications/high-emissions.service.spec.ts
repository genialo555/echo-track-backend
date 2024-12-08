import { Test, TestingModule } from '@nestjs/testing';
import { HighEmissionsService } from './high-emissions.service';

describe('HighEmissionsService', () => {
  let service: HighEmissionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HighEmissionsService],
    }).compile();

    service = module.get<HighEmissionsService>(HighEmissionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
