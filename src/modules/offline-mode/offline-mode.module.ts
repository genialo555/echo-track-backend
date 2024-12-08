import { Module } from '@nestjs/common';
import { SyncDataModule } from './sync-data/sync-data.module';
import { SyncDataController } from './sync-data.controller';
import { SyncDataService } from './sync-data.service';
import { UseOfflineModule } from './use-offline/use-offline.module';
import { UseOfflineController } from './use-offline.controller';
import { UseOfflineService } from './use-offline.service';

@Module({
  imports: [SyncDataModule, UseOfflineModule],
  controllers: [SyncDataController, UseOfflineController],
  providers: [SyncDataService, UseOfflineService]
})
export class OfflineModeModule {}
