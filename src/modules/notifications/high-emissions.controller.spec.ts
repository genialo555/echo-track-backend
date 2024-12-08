import { Test, TestingModule } from '@nestjs/testing';
import { HighEmissionsController } from './high-emissions.controller';

describe('HighEmissionsController', () => {
  let controller: HighEmissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighEmissionsController],
    }).compile();

    controller = module.get<HighEmissionsController>(HighEmissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
