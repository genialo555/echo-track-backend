import { Test, TestingModule } from '@nestjs/testing';
import { RtlLanguagesController } from './rtl-languages.controller';

describe('RtlLanguagesController', () => {
  let controller: RtlLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtlLanguagesController],
    }).compile();

    controller = module.get<RtlLanguagesController>(RtlLanguagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
