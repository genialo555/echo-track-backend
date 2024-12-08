import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { UserManagementModule } from './user-management.module';
import { TeamGoalsService } from '../team-goals/team-goals.service';
import { TeamGoalsController } from '../team-goals/team-goals.controller';
import { TeamGoalsModule } from '../team-goals/team-goals.module';
import { DashboardService } from '../dashboard/dashboard.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardController } from '../dashboard/dashboard.controller';

@Module({
  imports: [
    DashboardModule,
    TeamGoalsModule,
    UserManagementModule
  ],
  controllers: [
    DashboardController,
    TeamGoalsController,
    UserManagementController
  ],
  providers: [
    DashboardService,
    TeamGoalsService,
    UserManagementService
  ]
})
export class EnterpriseModule {}