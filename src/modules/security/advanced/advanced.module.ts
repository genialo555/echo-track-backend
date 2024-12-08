import { Module } from '@nestjs/common';
import { ThreatProtectionModule } from './threat-protection/threat-protection.module';
import { ThreatProtectionController } from './threat-protection.controller';
import { ThreatProtectionService } from './threat-protection.service';

@Module({
  imports: [ThreatProtectionModule],
  controllers: [ThreatProtectionController],
  providers: [ThreatProtectionService]
})
export class AdvancedModule {}
