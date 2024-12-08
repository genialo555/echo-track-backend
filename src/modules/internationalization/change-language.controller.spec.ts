import { Test, TestingModule } from '@nestjs/testing';
import { ChangeLanguageController } from './change-language.controller';

describe('ChangeLanguageController', () => {
  let controller: ChangeLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChangeLanguageController],
    }).compile();

    controller = module.get<ChangeLanguageController>(ChangeLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
