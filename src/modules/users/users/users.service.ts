import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../../auth/dtos/register.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { VehicleDto } from '@/modules/vehicles/dtos/vehicule.dto';
import { JourneyDto } from '@/modules/journeys/dtos/journeys.dto';
import { Journey } from '../../journeys/entities/journey.entity';
import { UserResponseDto } from '../../auth/dtos/user.response.dto';
import { CreateVehicleDto } from '@/modules/vehicles/dtos/create-vehicle.dto';
import { LocationPointDto } from '@/modules/journeys/dtos/location-point.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Vehicle)
        private readonly vehiclesRepository: Repository<Vehicle>,
        private readonly dataSource: DataSource
    ) {}

    async findById(id: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({
                where: { id },
                relations: ['vehicles', 'termsConditionsAcceptances', 'journeys', 'journeys.locationPoints'],
            });
            
            if (!user) {
                throw new NotFoundException(`L'utilisateur avec l'ID "${id}" n'a pas été trouvé`);
            }
            
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError('Erreur lors de la recherche de l\'utilisateur', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la recherche de l\'utilisateur');
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.usersRepository.findOne({
                where: { email },
                relations: ['vehicles', 'termsConditionsAcceptances', 'journeys', 'journeys.locationPoints'],
            });
        } catch (error) {
            this.handleError('Erreur lors de la recherche par email', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la recherche de l\'utilisateur');
        }
    }

    async create(registerDto: RegisterDto): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const existingEmail = await this.findByEmail(registerDto.email);
            if (existingEmail) {
                throw new ConflictException('Cette adresse email est déjà utilisée');
            }
    
            const existingUsername = await this.findOne({ username: registerDto.username });
            if (existingUsername) {
                throw new ConflictException('Ce nom d\'utilisateur est déjà pris');
            }
    
            const user = this.usersRepository.create(registerDto);
            const savedUser = await queryRunner.manager.save(User, user);
            
            await queryRunner.commitTransaction();
            return savedUser;
    
        } catch (error) {
            await queryRunner.rollbackTransaction();
            
            if (error instanceof ConflictException) {
                throw error;
            }
            
            interface PostgresError {
                code?: string;
                detail?: string;
            }
    
            const isPostgresError = (err: unknown): err is PostgresError => {
                return typeof err === 'object' && err !== null && ('code' in err || 'detail' in err);
            }
    
            if (isPostgresError(error) && error.code === '23505') {
                if (error.detail?.includes('email')) {
                    throw new ConflictException('Cette adresse email est déjà utilisée');
                }
                if (error.detail?.includes('username')) {
                    throw new ConflictException('Ce nom d\'utilisateur est déjà pris');
                }
            }
            
            this.handleError('Erreur lors de la création de l\'utilisateur', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la création du compte');
        } finally {
            await queryRunner.release();
        }
    }

    async createUserWithVehicle(createUserDto: RegisterDto, createVehicleDto: CreateVehicleDto): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            const user = await this.create(createUserDto);
            
            const vehicle = this.vehiclesRepository.create({
                brand: createVehicleDto.make,
                model: createVehicleDto.model,
                color: createVehicleDto.color,
                user,
            });
            
            await queryRunner.manager.save(Vehicle, vehicle);
            
            await queryRunner.commitTransaction();
            return user;
    
        } catch (error) {
            await queryRunner.rollbackTransaction();
            this.handleError('Erreur lors de la création de l\'utilisateur avec véhicule', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la création du compte avec véhicule');
        } finally {
            await queryRunner.release();
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.findById(id);
            
            if (updateUserDto.email && updateUserDto.email !== user.email) {
                const existingEmail = await this.findByEmail(updateUserDto.email);
                if (existingEmail) {
                    throw new ConflictException('Cette adresse email est déjà utilisée');
                }
            }

            Object.assign(user, updateUserDto);
            return await this.usersRepository.save(user);
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            this.handleError('Erreur lors de la mise à jour de l\'utilisateur', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la mise à jour du profil');
        }
    }

    async updateProfile(id: string, updateUserDto: UpdateUserDto, file?: Express.Multer.File): Promise<User> {
        try {
            const user = await this.update(id, updateUserDto);
            
            if (file) {
                user.profileImage = file.filename;
                await this.usersRepository.save(user);
            }
            
            return user;
        } catch (error) {
            this.handleError('Erreur lors de la mise à jour du profil', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la mise à jour du profil');
        }
    }

    async remove(id: string): Promise<void> {
        try {
            const result = await this.usersRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`L'utilisateur avec l'ID "${id}" n'a pas été trouvé`);
            }
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.handleError('Erreur lors de la suppression de l\'utilisateur', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la suppression du compte');
        }
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            this.handleError('Erreur lors de la comparaison des mots de passe', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la vérification du mot de passe');
        }
    }

    transformToGetUserDto(user: User): UserResponseDto {
        if (!user) {
            throw new BadRequestException('L\'utilisateur ne peut pas être null ou undefined');
        }

        return new UserResponseDto({
            id: user.id,
            username: user.username,
            email: user.email,
            isEmailConfirmed: user.isEmailConfirmed,
            isActive: user.isActive,
            role: user.role,
            provider: user.provider,
            profileImage: user.profileImage || null,
            vehicles: user.vehicles || [],
            termsConditionsAcceptances: user.termsConditionsAcceptances || [],
            journeys: user.journeys?.map(journey => this.transformJourneyToDto(journey)) || [],
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLoginAt: user.lastLoginAt || null,
            lastName: user.lastName || '',
            firstName: user.firstName || '',
        });
    }

    private transformJourneyToDto(journey: Journey): JourneyDto {
        if (!journey) {
            throw new Error('Journey cannot be null or undefined');
        }

        return {
            id: journey.id,
            startTime: journey.startTime,
            endTime: journey.endTime,
            distance: journey.distance,
            duration: journey.duration,
            emissionsCo2: journey.emissionsCo2,
            startLocation: journey.startLocation,
            endLocation: journey.endLocation,
            locationPoints: this.transformLocationPoints(journey.locationPoints)
        };
    }

    private transformLocationPoints(points: any[] = []): LocationPointDto[] {
        return points?.map(point => ({
            latitude: point.latitude,
            longitude: point.longitude,
            timestamp: point.timestamp || new Date(),
            altitude: point.altitude,
            speed: point.speed
        })) || [];
    }

    private transformVehicleToDto(vehicle: Vehicle): VehicleDto {
        return {
            id: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            color: vehicle.color,
        };
    }

    async findOne(criteria: FindOptionsWhere<User>): Promise<User | null> {
        try {
            return await this.usersRepository.findOne({
                where: criteria,
                relations: ['vehicles', 'termsConditionsAcceptances', 'journeys', 'journeys.locationPoints'],
            });
        } catch (error) {
            this.handleError('Erreur lors de la recherche de l\'utilisateur', error);
            throw new InternalServerErrorException('Une erreur inattendue est survenue');
        }
    }

    private handleError(message: string, error: unknown): void {
        console.error(`${message}:`, error instanceof Error ? error.stack : error);
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{
        users: UserResponseDto[];
        total: number;
        page: number;
        totalPages: number;
    }> {
        try {
            const skip = (page - 1) * limit;
    
            const [users, total] = await this.usersRepository.findAndCount({
                relations: ['vehicles', 'termsConditionsAcceptances', 'journeys', 'journeys.locationPoints'],
                skip,
                take: limit,
                order: {
                    createdAt: 'DESC'
                }
            });
    
            if (!users.length && page > 1) {
                throw new NotFoundException('Aucun utilisateur trouvé pour cette page');
            }
    
            const transformedUsers = users.map(user => this.transformToGetUserDto(user));
            const totalPages = Math.ceil(total / limit);
    
            return {
                users: transformedUsers,
                total,
                page,
                totalPages
            };
    
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            this.handleError('Erreur lors de la récupération des utilisateurs', error);
            throw new InternalServerErrorException('Une erreur est survenue lors de la récupération des utilisateurs');
        }
    }
}