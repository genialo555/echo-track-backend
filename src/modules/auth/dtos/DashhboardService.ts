// src/modules/auth/dtos/DashboardService.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { Journey } from '../../journeys/entities/journey.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getDashboardStats(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [todayJourneys, monthJourneys] = await Promise.all([
      this.journeyRepository.count({
        where: {
          userId,
          startTime: MoreThanOrEqual(today)
        }
      }),
      this.journeyRepository.count({
        where: {
          userId,
          startTime: MoreThanOrEqual(firstDayOfMonth)
        }
      })
    ]);

    return {
      todayJourneys,
      monthJourneys,
    };
  }

  async getJourneyStats(userId: string, startDate: Date, endDate: Date) {
    const journeys = await this.journeyRepository.find({
      where: {
        userId,
        startTime: Between(startDate, endDate)
      },
      order: {
        startTime: 'ASC'
      }
    });

    const dailyStats = new Map<string, number>();
    
    journeys.forEach(journey => {
      const date = journey.startTime.toISOString().split('T')[0];
      const currentCount = dailyStats.get(date) || 0;
      dailyStats.set(date, currentCount + 1);
    });

    return Array.from(dailyStats.entries()).map(([date, count]) => ({
      date,
      count
    }));
  }

  async getUserStats(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['journeys']
    });

    if (!user) {
      return null;
    }

    const lastJourney = await this.journeyRepository.findOne({
      where: { userId },
      order: { startTime: 'DESC' }
    });

    return {
      totalJourneys: user.journeys?.length || 0,
      lastActive: lastJourney?.startTime || user?.createdAt,
    };
  }
}