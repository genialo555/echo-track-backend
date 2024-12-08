import { Test, TestingModule } from '@nestjs/testing';
import { PersonalizedService } from './personalized.service';

describe('PersonalizedService', () => {
  let service: PersonalizedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalizedService],
    }).compile();

    service = module.get<PersonalizedService>(PersonalizedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
