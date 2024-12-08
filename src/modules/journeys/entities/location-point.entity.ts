import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Journey } from '../entities/journey.entity';

@Entity('location_points')
export class LocationPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('float', { nullable: true })
  altitude?: number;

  @Column('float', { nullable: true })
  speed?: number;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Journey, journey => journey.locationPoints, {
    onDelete: 'CASCADE'
  })
  journey: Journey;

  @Column('uuid')
  journeyId: string;
}