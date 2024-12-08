import { Test, TestingModule } from '@nestjs/testing';
import { ShareJourneysController } from './share-journeys.controller';

describe('ShareJourneysController', () => {
  let controller: ShareJourneysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareJourneysController],
    }).compile();

    controller = module.get<ShareJourneysController>(ShareJourneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
