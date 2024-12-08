import { Module } from '@nestjs/common';
import { CertificationsModule } from './certifications/certifications.module';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';
import { CcpaComplianceModule } from './ccpa-compliance/ccpa-compliance.module';
import { CcpaComplianceController } from './ccpa-compliance.controller';
import { CcpaComplianceService } from './ccpa-compliance.service';
import { IsoCertificationModule } from './iso-certification/iso-certification.module';
import { IsoCertificationController } from './iso-certification.controller';
import { IsoCertificationService } from './iso-certification.service';

@Module({
  imports: [CertificationsModule, CcpaComplianceModule, IsoCertificationModule],
  controllers: [CertificationsController, CcpaComplianceController, IsoCertificationController],
  providers: [CertificationsService, CcpaComplianceService, IsoCertificationService]
})
export class ComplianceModule {}
