import { Module } from '@nestjs/common';
import { CalendarsModule } from './calendars/calendars.module';
import { CalendarsController } from './calendars.controller';
import { CalendarsService } from './calendars.service';
import { ConnectDevicesModule } from './connect-devices/connect-devices.module';
import { ConnectDevicesController } from './connect-devices.controller';
import { ConnectDevicesService } from './connect-devices.service';
import { ImportDataModule } from './import-data/import-data.module';
import { ImportDataController } from './import-data.controller';
import { ImportDataService } from './import-data.service';
import { TransportAppsModule } from './transport-apps/transport-apps.module';
import { TransportAppsController } from './transport-apps.controller';
import { TransportAppsService } from './transport-apps.service';

@Module({
  imports: [CalendarsModule, ConnectDevicesModule, ImportDataModule, TransportAppsModule],
  controllers: [CalendarsController, ConnectDevicesController, ImportDataController, TransportAppsController],
  providers: [CalendarsService, ConnectDevicesService, ImportDataService, TransportAppsService]
})
export class IntegrationsModule {}
