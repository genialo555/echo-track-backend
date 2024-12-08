import { Test, TestingModule } from '@nestjs/testing';
import { EnhanceGraphsController } from './enhance-graphs.controller';

describe('EnhanceGraphsController', () => {
  let controller: EnhanceGraphsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnhanceGraphsController],
    }).compile();

    controller = module.get<EnhanceGraphsController>(EnhanceGraphsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
