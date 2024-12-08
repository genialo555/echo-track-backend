import { Module } from '@nestjs/common';
import { SettingsModule } from './settings/settings.module';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { SetupModule } from './setup/setup.module';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';

@Module({
  imports: [SettingsModule, SetupModule],
  controllers: [SettingsController, SetupController],
  providers: [SettingsService, SetupService]
})
export class ProfileModule {}
