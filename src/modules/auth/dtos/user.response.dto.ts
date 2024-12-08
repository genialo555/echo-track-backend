import { Role } from '../../../database/common/enums/role.enum';
import { AuthProvider } from '../../../database/common/enums/auth-provider.enum';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { TermsConditionsAcceptance } from '../../legal/terms-conditions/terms-conditions-acceptance.entity';
import { JourneyDto } from '../../journeys/dtos/journeys.dto';
import { LocationPointDto } from '../../journeys/dtos/location-point.dto';

interface LocationPointData {
    latitude: number;
    longitude: number;
    altitude?: number;
    speed?: number;
    timestamp: Date;
}

export class UserResponseDto {
    id: string;
    username: string;
    email: string;
    isEmailConfirmed: boolean;
    isActive: boolean;
    role: Role;
    provider: AuthProvider;
    profileImage?: string | null;
    vehicles: Vehicle[];
    termsConditionsAcceptances: TermsConditionsAcceptance[];
    journeys: JourneyDto[];
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date | null;
    lastName?: string | null;
    firstName?: string | null;

    constructor(user: any) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.isEmailConfirmed = user.isEmailConfirmed;
        this.isActive = user.isActive;
        this.role = user.role;
        this.provider = user.provider;
        this.profileImage = user.profileImage ?? null;
        this.vehicles = this.validateArray(user.vehicles);
        this.termsConditionsAcceptances = this.validateArray(user.termsConditionsAcceptances);
        this.journeys = this.validateArray(user.journeys).map(journey => this.transformJourneyToDto(journey));
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.lastLoginAt = user.lastLoginAt ?? null;
        this.lastName = user.lastName ?? null;
        this.firstName = user.firstName ?? null;
    }

    private validateArray<T>(data: T[]): T[] {
        return Array.isArray(data) ? data : [];
    }

    private isLocationPointData(point: any): point is LocationPointData {
        return (
            typeof point === 'object' &&
            point !== null &&
            typeof point.latitude === 'number' &&
            typeof point.longitude === 'number' &&
            point.timestamp instanceof Date
        );
    }

    private transformJourneyToDto(journey: any): JourneyDto {
        if (!journey) {
            throw new Error('Journey cannot be null or undefined');
        }

        const locationPoints: LocationPointDto[] = journey.locationPoints?.map((point: any) => {
            // Si le point utilise lat/lng, convertir en latitude/longitude
            if ('lat' in point && 'lng' in point) {
                return {
                    latitude: point.lat,
                    longitude: point.lng,
                    timestamp: new Date(), // Vous devrez peut-être ajuster ceci selon vos besoins
                    altitude: point.altitude,
                    speed: point.speed
                };
            }
            // Si le point utilise déjà latitude/longitude
            return {
                latitude: point.latitude,
                longitude: point.longitude,
                timestamp: point.timestamp || new Date(),
                altitude: point.altitude,
                speed: point.speed
            };
        }) || [];

        return {
            id: journey.id,
            startTime: journey.startTime,
            endTime: journey.endTime,
            distance: journey.distance,
            duration: journey.duration,
            emissionsCo2: journey.emissionsCo2,
            startLocation: journey.startLocation,
            endLocation: journey.endLocation,
            locationPoints: locationPoints
        };
    }
}