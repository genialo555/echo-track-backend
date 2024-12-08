import { Test, TestingModule } from '@nestjs/testing';
import { ContextualTipsService } from './contextual-tips.service';

describe('ContextualTipsService', () => {
  let service: ContextualTipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContextualTipsService],
    }).compile();

    service = module.get<ContextualTipsService>(ContextualTipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
