import { Test, TestingModule } from '@nestjs/testing';
import { ScalabilityService } from './scalability.service';

describe('ScalabilityService', () => {
  let service: ScalabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScalabilityService],
    }).compile();

    service = module.get<ScalabilityService>(ScalabilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
