import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';
import { UsersService } from 'src/modules/users/users/users.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
    private usersService: UsersService,
  ) {}

  async create(userId: string, createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const user = await this.usersService.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const vehicle = this.vehiclesRepository.create({
      ...createVehicleDto,
      user,
    });

    return this.vehiclesRepository.save(vehicle);
  }

  async findAll(userId: string): Promise<Vehicle[]> {
    return this.vehiclesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(userId: string, vehicleId: string): Promise<Vehicle | null> {
    try {
      const vehicle = await this.vehiclesRepository.findOne({
        where: { id: vehicleId, user: { id: userId } },
        relations: ['user'],
      });

      if (!vehicle) {
        throw new NotFoundException('Vehicle not found');
      }

      return vehicle;
    } catch (error) {
      this.handleError('Failed to find vehicle', error);
      throw new InternalServerErrorException('Failed to find vehicle');
    }
  }

  async update(userId: string, vehicleId: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle | null> {
    const result = await this.vehiclesRepository.update(
      { id: vehicleId, user: { id: userId } },
      updateVehicleDto,
    );

    if (result.affected === 0) {
      return null;
    }

    return this.findOne(userId, vehicleId);
  }

  async remove(userId: string, vehicleId: string): Promise<void> {
    const vehicle = await this.findOne(userId, vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    await this.vehiclesRepository.delete({ id: vehicleId, user: { id: userId } });
  }

  private handleError(message: string, error: unknown): void {
    console.error(message, error);
    if (error instanceof Error) {
      throw new InternalServerErrorException(error.message);
    } else {
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }
}
