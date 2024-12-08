import { Test, TestingModule } from '@nestjs/testing';
import { GlobalSearchController } from './global-search.controller';

describe('GlobalSearchController', () => {
  let controller: GlobalSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalSearchController],
    }).compile();

    controller = module.get<GlobalSearchController>(GlobalSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
