import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneSupportController } from './timezone-support.controller';

describe('TimezoneSupportController', () => {
  let controller: TimezoneSupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimezoneSupportController],
    }).compile();

    controller = module.get<TimezoneSupportController>(TimezoneSupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
