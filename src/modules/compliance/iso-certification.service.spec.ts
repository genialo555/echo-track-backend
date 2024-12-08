import { Test, TestingModule } from '@nestjs/testing';
import { IsoCertificationService } from './iso-certification.service';

describe('IsoCertificationService', () => {
  let service: IsoCertificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IsoCertificationService],
    }).compile();

    service = module.get<IsoCertificationService>(IsoCertificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
