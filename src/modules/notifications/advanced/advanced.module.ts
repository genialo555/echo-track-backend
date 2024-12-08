import { Module } from '@nestjs/common';
import { PreferencesModule } from './preferences/preferences.module';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { ScheduledModule } from './scheduled/scheduled.module';
import { ScheduledController } from './scheduled.controller';
import { ScheduledService } from './scheduled.service';

@Module({
  imports: [PreferencesModule, ScheduledModule],
  controllers: [PreferencesController, ScheduledController],
  providers: [PreferencesService, ScheduledService]
})
export class AdvancedModule {}
