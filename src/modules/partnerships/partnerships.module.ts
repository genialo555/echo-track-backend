import { Module } from '@nestjs/common';
import { EcoOrganizationsModule } from './eco-organizations/eco-organizations.module';
import { EcoOrganizationsController } from './eco-organizations.controller';
import { EcoOrganizationsService } from './eco-organizations.service';
import { AffiliatesModule } from './affiliates/affiliates.module';
import { AffiliatesController } from './affiliates.controller';
import { AffiliatesService } from './affiliates.service';

@Module({
  imports: [EcoOrganizationsModule, AffiliatesModule],
  controllers: [EcoOrganizationsController, AffiliatesController],
  providers: [EcoOrganizationsService, AffiliatesService]
})
export class PartnershipsModule {}
