import { Test, TestingModule } from '@nestjs/testing';
import { MultilingualSupportService } from './multilingual-support.service';

describe('MultilingualSupportService', () => {
  let service: MultilingualSupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultilingualSupportService],
    }).compile();

    service = module.get<MultilingualSupportService>(MultilingualSupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
