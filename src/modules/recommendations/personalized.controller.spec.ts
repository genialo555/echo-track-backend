import { Test, TestingModule } from '@nestjs/testing';
import { PersonalizedController } from './personalized.controller';

describe('PersonalizedController', () => {
  let controller: PersonalizedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalizedController],
    }).compile();

    controller = module.get<PersonalizedController>(PersonalizedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
