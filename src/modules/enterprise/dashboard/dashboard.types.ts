// src/modules/dashboard/types/dashboard.types.ts
export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalJourneys: number;
  totalDistance: number;
  averageJourneyDuration: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  journeysToday: number;
  journeysThisMonth: number;
  userGrowthRate: number;
  completionRate: number;
  peakHours: {
    hour: number;
    count: number;
  }[];
}

export interface TimeSeriesData {
  date: string;
  value: number;
  changePercent?: number;
  trend?: 'up' | 'down' | 'stable';
  metadata?: {
    label?: string;
    category?: string;
    annotations?: string[];
  };
}

export interface DashboardFilters {
  startDate?: Date;
  endDate?: Date;
  userType?: string;
  journeyStatus?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface PerformanceMetrics {
  averageSpeed: number;
  averageDistance: number;
  totalTime: number;
  efficiency: number;
}

export interface UserActivitySummary {
  userId: string;
  username: string;
  lastActive: Date;
  journeyCount: number;
  totalDistance: number;
  achievements: string[];
}