import { Test, TestingModule } from '@nestjs/testing';
import { RegionalFormatsService } from './regional-formats.service';

describe('RegionalFormatsService', () => {
  let service: RegionalFormatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionalFormatsService],
    }).compile();

    service = module.get<RegionalFormatsService>(RegionalFormatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
