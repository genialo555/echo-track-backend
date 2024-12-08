import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHandlingController } from './error-handling.controller';

describe('ErrorHandlingController', () => {
  let controller: ErrorHandlingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorHandlingController],
    }).compile();

    controller = module.get<ErrorHandlingController>(ErrorHandlingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
