import { Test, TestingModule } from '@nestjs/testing';
import { EcoOrganizationsService } from './eco-organizations.service';

describe('EcoOrganizationsService', () => {
  let service: EcoOrganizationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcoOrganizationsService],
    }).compile();

    service = module.get<EcoOrganizationsService>(EcoOrganizationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
