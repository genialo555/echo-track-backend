import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Journey } from '../entities/journey.entity';
import { LocationPoint } from '../entities/location-point.entity';
import { CreateJourneyDto } from '../dtos/create-journey.dto';
import { UpdateJourneyDto } from '../dtos/update-journey.dto';
import { LocationPointDto } from '../dtos/location-point.dto';

@Injectable()
export class JourneysService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
    @InjectRepository(LocationPoint)
    private readonly locationPointRepository: Repository<LocationPoint>,
  ) {}

  private async createLocationPoints(points: LocationPointDto[], journey: Journey): Promise<LocationPoint[]> {
    const locationPoints = points.map(point => {
      const locationPoint = new LocationPoint();
      locationPoint.latitude = point.latitude;
      locationPoint.longitude = point.longitude;
      locationPoint.altitude = point.altitude;
      locationPoint.speed = point.speed;
      locationPoint.timestamp = point.timestamp;
      locationPoint.journey = journey;
      return locationPoint;
    });

    return await this.locationPointRepository.save(locationPoints);
  }

  async createJourney(userId: string, createJourneyDto: CreateJourneyDto): Promise<Journey> {
    // Create journey first
    const journey = this.journeyRepository.create({
      userId,
      startTime: createJourneyDto.startTime,
      endTime: createJourneyDto.endTime,
      distance: createJourneyDto.distance,
      duration: createJourneyDto.duration,
      emissionsCo2: createJourneyDto.emissionsCo2,
      startLocation: createJourneyDto.startLocation,
      endLocation: createJourneyDto.endLocation,
    });

    // Save journey
    const savedJourney = await this.journeyRepository.save(journey);

    // Create location points if they exist
    if (createJourneyDto.locationPoints?.length > 0) {
      await this.createLocationPoints(createJourneyDto.locationPoints, savedJourney);
    }

    // Retrieve complete journey with points
    const journeyWithPoints = await this.journeyRepository.findOne({
      where: { id: savedJourney.id },
      relations: ['locationPoints'],
    });

    if (!journeyWithPoints) {
      throw new NotFoundException('Journey not found after creation');
    }

    return journeyWithPoints;
  }

  async getJourneys(userId: string): Promise<Journey[]> {
    return await this.journeyRepository.find({
      where: { userId },
      relations: ['locationPoints'],
      order: { startTime: 'DESC' },
    });
  }

  async getJourneyById(userId: string, journeyId: string): Promise<Journey> {
    const journey = await this.journeyRepository.findOne({
      where: { 
        id: journeyId,
        userId
      },
      relations: ['locationPoints']
    });

    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return journey;
  }

  async updateJourney(
    userId: string,
    journeyId: string,
    updateJourneyDto: UpdateJourneyDto,
  ): Promise<Journey> {
    const journey = await this.getJourneyById(userId, journeyId);

    // Update journey base fields
    Object.assign(journey, {
      startTime: updateJourneyDto.startTime ?? journey.startTime,
      endTime: updateJourneyDto.endTime ?? journey.endTime,
      distance: updateJourneyDto.distance ?? journey.distance,
      duration: updateJourneyDto.duration ?? journey.duration,
      emissionsCo2: updateJourneyDto.emissionsCo2 ?? journey.emissionsCo2,
      startLocation: updateJourneyDto.startLocation ?? journey.startLocation,
      endLocation: updateJourneyDto.endLocation ?? journey.endLocation,
    });

    // Save updated journey
    const updatedJourney = await this.journeyRepository.save(journey);

    // Update location points if provided
    if (updateJourneyDto.locationPoints) {
      await this.locationPointRepository.delete({ journey: { id: journeyId } });
      await this.createLocationPoints(updateJourneyDto.locationPoints, updatedJourney);
    }

    // Return complete updated journey
    return await this.getJourneyById(userId, journeyId);
  }

  async deleteJourney(userId: string, journeyId: string): Promise<{ message: string }> {
    const journey = await this.getJourneyById(userId, journeyId);
    
    await this.journeyRepository.remove(journey);
    // Les points de localisation seront supprimés automatiquement grâce à la cascade
    
    return { message: 'Journey deleted successfully' };
  }
}