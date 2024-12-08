import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min, IsArray } from 'class-validator';

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    brand: string;  // Changed from 'make' to match VehicleDto

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1886)
    year: number;

    @IsOptional()
    @IsString()
    @MaxLength(17)
    vin?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    mileage?: number;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    licensePlate?: string;

    @IsOptional()
    @IsString()
    registrationState?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @IsOptional()
    @IsArray()
    @IsUrl({}, { each: true })
    imageUrls?: string[];
    make: string | undefined;
}