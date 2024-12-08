import { Test, TestingModule } from '@nestjs/testing';
import { HelpCenterController } from './help-center.controller';

describe('HelpCenterController', () => {
  let controller: HelpCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelpCenterController],
    }).compile();

    controller = module.get<HelpCenterController>(HelpCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
