import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedChartsService } from './advanced-charts.service';

describe('AdvancedChartsService', () => {
  let service: AdvancedChartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvancedChartsService],
    }).compile();

    service = module.get<AdvancedChartsService>(AdvancedChartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
