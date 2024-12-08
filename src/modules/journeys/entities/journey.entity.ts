import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { LocationPoint } from './location-point.entity';

@Entity('journeys')
export class Journey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp', { nullable: true })
  endTime: Date;

  @Column('float')
  distance: number;

  @Column('float')
  duration: number;

  @Column('float', { name: 'emissions_co2' })
  emissionsCo2: number;

  @Column({ length: 255, name: 'start_location' })
  startLocation: string;

  @Column({ length: 255, name: 'end_location' })
  endLocation: string;

  @OneToMany(() => LocationPoint, locationPoint => locationPoint.journey, {
    cascade: true,
    eager: true
  })
  locationPoints: LocationPoint[];

  @ManyToOne(() => User, user => user.journeys, {
    onDelete: 'CASCADE'
  })
  user: User;

  @Column('uuid')
  userId: string;
}