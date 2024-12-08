import { Test, TestingModule } from '@nestjs/testing';
import { EnhancedInteractivityController } from './enhanced-interactivity.controller';

describe('EnhancedInteractivityController', () => {
  let controller: EnhancedInteractivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnhancedInteractivityController],
    }).compile();

    controller = module.get<EnhancedInteractivityController>(EnhancedInteractivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
