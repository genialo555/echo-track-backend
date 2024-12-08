import { Test, TestingModule } from '@nestjs/testing';
import { ChangeLanguageService } from './change-language.service';

describe('ChangeLanguageService', () => {
  let service: ChangeLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChangeLanguageService],
    }).compile();

    service = module.get<ChangeLanguageService>(ChangeLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
