import { Test, TestingModule } from '@nestjs/testing';
import { ImportDataController } from './import-data.controller';

describe('ImportDataController', () => {
  let controller: ImportDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportDataController],
    }).compile();

    controller = module.get<ImportDataController>(ImportDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
