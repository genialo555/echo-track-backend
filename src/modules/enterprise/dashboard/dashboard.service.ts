import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';
import { Journey } from '@/modules/journeys/entities/journey.entity';
import { DashboardMetrics, TimeSeriesData, DashboardFilters, PerformanceMetrics, UserActivitySummary } from './dashboard.types'

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
  ) {}

  async getMetrics(): Promise<DashboardMetrics> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalUsers,
      activeUsers,
      totalJourneys,
      newUsersToday,
      newUsersThisMonth,
      journeysToday,
      journeysThisMonth,
      averageMetrics
    ] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.count({ where: { isActive: true } }),
      this.journeyRepository.count(),
      this.userRepository.count({ where: { createdAt: MoreThanOrEqual(today) } }),
      this.userRepository.count({ where: { createdAt: MoreThanOrEqual(firstDayOfMonth) } }),
      this.journeyRepository.count({ where: { startTime: MoreThanOrEqual(today) } }),
      this.journeyRepository.count({ where: { startTime: MoreThanOrEqual(firstDayOfMonth) } }),
      this.calculateAverageMetrics()
    ]);

    return {
      totalUsers,
      activeUsers,
      totalJourneys,
      newUsersToday,
      newUsersThisMonth,
      journeysToday,
      journeysThisMonth,
      totalDistance: averageMetrics.totalDistance,
      averageJourneyDuration: averageMetrics.averageDuration,
      userGrowthRate: this.calculateGrowthRate(totalUsers, newUsersThisMonth),
      completionRate: averageMetrics.completionRate,
      peakHours: await this.getPeakHours()
    };
  }

  private async calculateAverageMetrics() {
    const result = await this.journeyRepository
      .createQueryBuilder('journey')
      .select([
        'SUM(journey.distance) as totalDistance',
        'AVG(EXTRACT(EPOCH FROM (journey.endTime - journey.startTime))) as averageDuration',
        'COUNT(CASE WHEN journey.endTime IS NOT NULL THEN 1 END)::float / COUNT(*)::float * 100 as completionRate'
      ])
      .getRawOne();

    return {
      totalDistance: parseFloat(result.totalDistance) || 0,
      averageDuration: parseFloat(result.averageDuration) || 0,
      completionRate: parseFloat(result.completionRate) || 0
    };
  }

  private async getPeakHours() {
    return this.journeyRepository
      .createQueryBuilder('journey')
      .select([
        'EXTRACT(HOUR FROM journey.startTime) as hour',
        'COUNT(*) as count'
      ])
      .groupBy('hour')
      .orderBy('count', 'DESC')
      .limit(5)
      .getRawMany();
  }

  private calculateGrowthRate(total: number, new_items: number): number {
    if (total === 0) return 0;
    return (new_items / total) * 100;
  }

  async getDailyJourneys(startDate?: string, endDate?: string): Promise<TimeSeriesData[]> {
    const whereClause = startDate && endDate ? {
      startTime: Between(new Date(startDate), new Date(endDate))
    } : {};

    const journeys = await this.journeyRepository.find({
      where: whereClause,
      order: { startTime: 'ASC' },
    });

    const dailyData = new Map<string, { count: number, total: number }>();
    let previousCount = 0;

    journeys.forEach(journey => {
      const date = journey.startTime.toISOString().split('T')[0];
      const current = dailyData.get(date) || { count: 0, total: 0 };
      current.count += 1;
      dailyData.set(date, current);
    });

    return Array.from(dailyData.entries()).map(([date, data]) => {
      const changePercent = previousCount ? ((data.count - previousCount) / previousCount) * 100 : 0;
      previousCount = data.count;

      return {
        date,
        value: data.count,
        changePercent,
        trend: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'stable',
        metadata: {
          label: `${data.count} journeys`,
          category: 'daily',
        }
      };
    });
  }

  // ... autres méthodes existantes ...

  async getPerformanceMetrics(userId: string): Promise<PerformanceMetrics> {
    const metrics = await this.journeyRepository
      .createQueryBuilder('journey')
      .where('journey.userId = :userId', { userId })
      .select([
        'AVG(journey.speed) as averageSpeed',
        'AVG(journey.distance) as averageDistance',
        'SUM(EXTRACT(EPOCH FROM (journey.endTime - journey.startTime))) as totalTime'
      ])
      .getRawOne();

    const efficiency = (metrics.averageSpeed * metrics.averageDistance) / metrics.totalTime;

    return {
      averageSpeed: parseFloat(metrics.averageSpeed) || 0,
      averageDistance: parseFloat(metrics.averageDistance) || 0,
      totalTime: parseFloat(metrics.totalTime) || 0,
      efficiency
    };
  }

  async getUserActivitySummary(userId: string): Promise<UserActivitySummary> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['journeys']
    });

    if (!user) {
      throw new Error('User not found');
    }

    const lastJourney = await this.journeyRepository
      .createQueryBuilder('journey')
      .where('journey.userId = :userId', { userId })
      .orderBy('journey.startTime', 'DESC')
      .getOne();

    return {
      userId: user.id,
      username: user.username,
      lastActive: lastJourney?.startTime || user.createdAt,
      journeyCount: user.journeys.length,
      totalDistance: user.journeys.reduce((acc, journey) => acc + (journey.distance || 0), 0),
      achievements: [] // À implémenter selon vos besoins
    };
  }
}