import { Module } from '@nestjs/common';
import { DrpModule } from './drp/drp.module';
import { DrpController } from './drp.controller';
import { DrpService } from './drp.service';
import { MonitoringModule } from './monitoring/monitoring.module';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

@Module({
  imports: [DrpModule, MonitoringModule],
  controllers: [DrpController, MonitoringController],
  providers: [DrpService, MonitoringService]
})
export class OperationsModule {}
