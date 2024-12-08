import { Test, TestingModule } from '@nestjs/testing';
import { AddLogoController } from './add-logo.controller';

describe('AddLogoController', () => {
  let controller: AddLogoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddLogoController],
    }).compile();

    controller = module.get<AddLogoController>(AddLogoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
