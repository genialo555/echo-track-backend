import { Module } from '@nestjs/common';
import { AdvancedModule } from './advanced/advanced.module';
import { AlertsModule } from './alerts/alerts.module';
import { AlertsController } from './alerts/alerts.controller';
import { AlertsService } from './alerts/alerts.service';
import { DataPrivacyModule } from './data-privacy/data-privacy.module';
import { DataPrivacyController } from './data-privacy/data-privacy.controller';
import { DataPrivacyService } from './data-privacy/data-privacy.service';
import { RolesModule } from './roles/roles.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles.service';
import { RolesPermissionsModule } from './roles/roles-permissions/roles-permissions.module';
import { RolesPermissionsController } from './roles/roles-permissions/roles-permissions.controller';
import { RolesPermissionsService } from './roles/roles-permissions/roles-permissions.service';

@Module({
  imports: [AdvancedModule, AlertsModule, DataPrivacyModule, RolesModule, RolesPermissionsModule],
  controllers: [AlertsController, DataPrivacyController, RolesController, RolesPermissionsController],
  providers: [AlertsService, DataPrivacyService, RolesService, RolesPermissionsService]
})
export class SecurityModule {}
