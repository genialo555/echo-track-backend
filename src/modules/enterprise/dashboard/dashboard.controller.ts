// src/modules/dashboard/dashboard.controller.ts
import { Controller, Get, Query, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { 
  DashboardMetricsDto, 
  TimeSeriesDataDto, 
  PerformanceMetricsDto, 
  UserActivitySummaryDto 
} from './dasboard.dto';
import { 
  DashboardMetrics, 
  TimeSeriesData, 
  PerformanceMetrics, 
  UserActivitySummary 
} from './dashboard.types';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  @ApiResponse({ 
    type: DashboardMetricsDto,
    description: 'Get dashboard metrics'
  })
  async getMetrics(): Promise<DashboardMetrics> {
    return this.dashboardService.getMetrics();
  }

  @Get('journeys/daily')
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({ 
    type: [TimeSeriesDataDto],
    description: 'Get daily journey statistics'
  })
  async getDailyJourneys(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<TimeSeriesData[]> {
    return this.dashboardService.getDailyJourneys(startDate, endDate);
  }

  @Get('performance/:userId')
  @ApiResponse({ 
    type: PerformanceMetricsDto,
    description: 'Get user performance metrics'
  })
  async getUserPerformance(@Param('userId') userId: string): Promise<PerformanceMetrics> {
    return this.dashboardService.getPerformanceMetrics(userId);
  }

  @Get('activity/:userId')
  @ApiResponse({ 
    type: UserActivitySummaryDto,
    description: 'Get user activity summary'
  })
  async getUserActivity(@Param('userId') userId: string): Promise<UserActivitySummary> {
    return this.dashboardService.getUserActivitySummary(userId);
  }

  @Get('metrics/timeline')
  @ApiQuery({ 
    name: 'period', 
    enum: ['daily', 'weekly', 'monthly'],
    required: false 
  })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiResponse({
    type: [TimeSeriesDataDto],
    description: 'Get metrics timeline'
  })
  async getMetricsTimeline(
    @Query('period') period: 'daily' | 'weekly' | 'monthly' = 'daily',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<TimeSeriesData[]> {
    return this.dashboardService.getDailyJourneys(startDate, endDate);
  }
}