import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersService } from './modules/users/users/users.service';
import { VehiclesService } from './modules/vehicles/vehicles/vehicles.service';
import { TermsConditionsService } from './modules/legal/terms-conditions/terms-conditions-service';
import { CreateUserDto } from './modules/users/dtos/create-user.dto';
import { UpdateUserDto } from './modules/users/dtos/update-user.dto';
import { CreateVehicleDto } from './modules/vehicles/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './modules/vehicles/dtos/update-vehicle.dto';
import { CreateTermsConditionsDto } from './modules/legal/terms-conditions/dto/create-terms-conditions.dto';
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly vehiclesService: VehiclesService,
    private readonly termsConditionsService: TermsConditionsService,
  ) {}

  /**
   * Create a new user and optionally associate a vehicle.
   */
  async createUserWithVehicle(createUserDto: CreateUserDto, createVehicleDto?: CreateVehicleDto) {
    try {
        if (createVehicleDto) {
            return await this.usersService.createUserWithVehicle(createUserDto, createVehicleDto);
        }
        return await this.usersService.create(createUserDto);
    } catch (error) {
        this.handleError('Failed to create user with vehicle', error);
    }
}

  /**
   * Update a user by ID.
   */
  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(userId, updateUserDto);
    } catch (error) {
      this.handleError('Failed to update user', error);
    }
  }

  /**
   * Create a vehicle for a user.
   */
  async createVehicle(userId: string, createVehicleDto: CreateVehicleDto) {
    try {
      return await this.vehiclesService.create(userId, createVehicleDto);
    } catch (error) {
      this.handleError('Failed to create vehicle', error);
    }
  }

  /**
   * Update a vehicle for a user.
   */
  async updateVehicle(userId: string, vehicleId: string, updateVehicleDto: UpdateVehicleDto) {
    try {
      return await this.vehiclesService.update(userId, vehicleId, updateVehicleDto);
    } catch (error) {
      this.handleError('Failed to update vehicle', error);
    }
  }

  /**
   * Accept terms and conditions for a user.
   */
/**
 * Accept terms and conditions for a user.
 */
async acceptTermsConditions(userId: string, createTermsConditionsDto: CreateTermsConditionsDto) {
  try {
      // Extract the version string from the DTO
      const { version } = createTermsConditionsDto;
      
      // Pass only the version string to the createAcceptance method
      return await this.termsConditionsService.createAcceptance(userId, version);
  } catch (error) {
      this.handleError('Failed to accept terms and conditions', error);
  }
}

  /**
   * Log error details and throw an appropriate exception.
   */
  private handleError(message: string, error: unknown): never {
    this.logger.error(message, error instanceof Error ? error.stack : String(error));
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
