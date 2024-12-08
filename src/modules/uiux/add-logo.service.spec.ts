import { Test, TestingModule } from '@nestjs/testing';
import { AddLogoService } from './add-logo.service';

describe('AddLogoService', () => {
  let service: AddLogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddLogoService],
    }).compile();

    service = module.get<AddLogoService>(AddLogoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
