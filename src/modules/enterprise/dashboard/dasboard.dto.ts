// src/modules/dashboard/dto/dashboard.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class DashboardMetricsDto {
  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  activeUsers: number;

  @ApiProperty()
  totalJourneys: number;

  @ApiProperty()
  totalDistance: number;

  @ApiProperty()
  averageJourneyDuration: number;

  @ApiProperty()
  newUsersToday: number;

  @ApiProperty()
  newUsersThisMonth: number;

  @ApiProperty()
  journeysToday: number;

  @ApiProperty()
  journeysThisMonth: number;

  @ApiProperty()
  userGrowthRate: number;

  @ApiProperty()
  completionRate: number;

  @ApiProperty({ type: [Object] })
  peakHours: { hour: number; count: number; }[];
}

export class TimeSeriesDataDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  value: number;

  @ApiProperty({ required: false })
  changePercent?: number;

  @ApiProperty({ required: false, enum: ['up', 'down', 'stable'] })
  trend?: 'up' | 'down' | 'stable';

  @ApiProperty({ required: false })
  metadata?: {
    label?: string;
    category?: string;
    annotations?: string[];
  };
}

export class PerformanceMetricsDto {
  @ApiProperty()
  averageSpeed: number;

  @ApiProperty()
  averageDistance: number;

  @ApiProperty()
  totalTime: number;

  @ApiProperty()
  efficiency: number;
}

export class UserActivitySummaryDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  lastActive: Date;

  @ApiProperty()
  journeyCount: number;

  @ApiProperty()
  totalDistance: number;

  @ApiProperty({ type: [String] })
  achievements: string[];
}