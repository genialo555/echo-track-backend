import { Test, TestingModule } from '@nestjs/testing';
import { AssistantAiController } from './assistant-ai.controller';

describe('AssistantAiController', () => {
  let controller: AssistantAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistantAiController],
    }).compile();

    controller = module.get<AssistantAiController>(AssistantAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
