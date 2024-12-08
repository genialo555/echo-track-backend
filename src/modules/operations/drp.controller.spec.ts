import { Test, TestingModule } from '@nestjs/testing';
import { DrpController } from './drp.controller';

describe('DrpController', () => {
  let controller: DrpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrpController],
    }).compile();

    controller = module.get<DrpController>(DrpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
