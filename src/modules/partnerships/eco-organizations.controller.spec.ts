import { Test, TestingModule } from '@nestjs/testing';
import { EcoOrganizationsController } from './eco-organizations.controller';

describe('EcoOrganizationsController', () => {
  let controller: EcoOrganizationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcoOrganizationsController],
    }).compile();

    controller = module.get<EcoOrganizationsController>(EcoOrganizationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
