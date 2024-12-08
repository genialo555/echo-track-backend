import { Test, TestingModule } from '@nestjs/testing';
import { UseOfflineService } from './use-offline.service';

describe('UseOfflineService', () => {
  let service: UseOfflineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseOfflineService],
    }).compile();

    service = module.get<UseOfflineService>(UseOfflineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
