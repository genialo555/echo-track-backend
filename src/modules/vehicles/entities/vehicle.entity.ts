import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, Min } from 'class-validator';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  make: string;

  @Column()
  brand: string; // Assurez-vous que cette propriété existe


  @Column()
  @IsNotEmpty()
  @IsString()
  model: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(1886)
  year: number;


  @Column({ nullable: true, unique: true, length: 17 }) // Use length for strings
  @IsOptional()
  @IsString()
  @MaxLength(17)
  vin?: string;

  @Column({ nullable: true, type: 'int' }) // Specify integer type for mileage
  @IsOptional()
  @IsNumber()
  @Min(0)
  mileage?: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  color?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  licensePlate?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  registrationState?: string;


  @Column({ nullable: true, type: 'text' })
  @IsOptional()
  @IsString()
  description?: string;


  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @OneToMany(() => VehicleImage, (image) => image.vehicle, { cascade: true, eager: true })
  images: VehicleImage[];

  @ManyToOne(() => User, (user) => user.vehicles, { onDelete: 'CASCADE' })
  user: User;


  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) // Explicit default
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // Update on update
  updatedAt: Date;
}

@Entity()
export class VehicleImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsUrl()
  imageUrl: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images, { onDelete: 'CASCADE' })
  vehicle: Vehicle;
}