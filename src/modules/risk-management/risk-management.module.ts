import { Module } from '@nestjs/common';
import { RiskRegisterModule } from './risk-register/risk-register.module';
import { RiskRegisterController } from './risk-register.controller';
import { RiskRegisterService } from './risk-register.service';

@Module({
  imports: [RiskRegisterModule],
  controllers: [RiskRegisterController],
  providers: [RiskRegisterService]
})
export class RiskManagementModule {}
