import { Test, TestingModule } from '@nestjs/testing';
import { ContextualTipsController } from './contextual-tips.controller';

describe('ContextualTipsController', () => {
  let controller: ContextualTipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContextualTipsController],
    }).compile();

    controller = module.get<ContextualTipsController>(ContextualTipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
