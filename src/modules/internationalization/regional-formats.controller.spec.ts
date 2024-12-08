import { Test, TestingModule } from '@nestjs/testing';
import { RegionalFormatsController } from './regional-formats.controller';

describe('RegionalFormatsController', () => {
  let controller: RegionalFormatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionalFormatsController],
    }).compile();

    controller = module.get<RegionalFormatsController>(RegionalFormatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
