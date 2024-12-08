import { Test, TestingModule } from '@nestjs/testing';
import { JourneyUpdatesController } from './journey-updates.controller';

describe('JourneyUpdatesController', () => {
  let controller: JourneyUpdatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneyUpdatesController],
    }).compile();

    controller = module.get<JourneyUpdatesController>(JourneyUpdatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
