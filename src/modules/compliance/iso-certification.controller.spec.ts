import { Test, TestingModule } from '@nestjs/testing';
import { IsoCertificationController } from './iso-certification.controller';

describe('IsoCertificationController', () => {
  let controller: IsoCertificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsoCertificationController],
    }).compile();

    controller = module.get<IsoCertificationController>(IsoCertificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
