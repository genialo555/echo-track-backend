import { Test, TestingModule } from '@nestjs/testing';
import { EnhanceGraphsService } from './enhance-graphs.service';

describe('EnhanceGraphsService', () => {
  let service: EnhanceGraphsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnhanceGraphsService],
    }).compile();

    service = module.get<EnhanceGraphsService>(EnhanceGraphsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
