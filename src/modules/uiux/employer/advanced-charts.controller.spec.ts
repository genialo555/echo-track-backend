import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedChartsController } from './advanced-charts.controller';

describe('AdvancedChartsController', () => {
  let controller: AdvancedChartsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancedChartsController],
    }).compile();

    controller = module.get<AdvancedChartsController>(AdvancedChartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
