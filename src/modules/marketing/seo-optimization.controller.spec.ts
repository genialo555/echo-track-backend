import { Test, TestingModule } from '@nestjs/testing';
import { SeoOptimizationController } from './seo-optimization.controller';

describe('SeoOptimizationController', () => {
  let controller: SeoOptimizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeoOptimizationController],
    }).compile();

    controller = module.get<SeoOptimizationController>(SeoOptimizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
