import { Test, TestingModule } from '@nestjs/testing';
import { RtlLanguagesService } from './rtl-languages.service';

describe('RtlLanguagesService', () => {
  let service: RtlLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtlLanguagesService],
    }).compile();

    service = module.get<RtlLanguagesService>(RtlLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
