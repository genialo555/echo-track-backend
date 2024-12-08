import { Test, TestingModule } from '@nestjs/testing';
import { DataPrivacyService } from './data-privacy.service';

describe('DataPrivacyService', () => {
  let service: DataPrivacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataPrivacyService],
    }).compile();

    service = module.get<DataPrivacyService>(DataPrivacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
