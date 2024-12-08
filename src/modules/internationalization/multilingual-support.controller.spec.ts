import { Test, TestingModule } from '@nestjs/testing';
import { MultilingualSupportController } from './multilingual-support.controller';

describe('MultilingualSupportController', () => {
  let controller: MultilingualSupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultilingualSupportController],
    }).compile();

    controller = module.get<MultilingualSupportController>(MultilingualSupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
