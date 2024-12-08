import { Test, TestingModule } from '@nestjs/testing';
import { ScalabilityController } from './scalability.controller';

describe('ScalabilityController', () => {
  let controller: ScalabilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScalabilityController],
    }).compile();

    controller = module.get<ScalabilityController>(ScalabilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
