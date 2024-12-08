// src/modules/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '@/modules/users/entities/user.entity';
import { Journey } from '@/modules/journeys/entities/journey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Journey])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}