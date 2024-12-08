import { Module } from '@nestjs/common';
import { CollectDataModule } from './collect-data/collect-data.module';
import { CollectDataController } from './collect-data.controller';
import { CollectDataService } from './collect-data.service';

@Module({
  imports: [CollectDataModule],
  controllers: [CollectDataController],
  providers: [CollectDataService]
})
export class AnalyticsModule {}
