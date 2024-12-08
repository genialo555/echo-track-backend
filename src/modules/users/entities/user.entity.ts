import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../database/common/enums/role.enum';
import { AuthProvider } from '../../../database/common/enums/auth-provider.enum';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { TermsConditionsAcceptance } from '../../legal/terms-conditions/terms-conditions-acceptance.entity';
import { Journey } from 'src/modules/journeys/entities/journey.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationToken?: string;

  @Column({ nullable: true })
  confirmationTokenExpires?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL })
  provider: AuthProvider;

  @Column({ nullable: true })
  providerId?: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  resetPasswordToken?: string;

  @Column({ nullable: true })
  resetPasswordExpires?: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.user, { cascade: true })
  vehicles: Vehicle[];

  @OneToMany(
    () => TermsConditionsAcceptance,
    (acceptance) => acceptance.user,
    { cascade: true },
  )
  termsConditionsAcceptances: TermsConditionsAcceptance[];

  @OneToMany(() => Journey, (journey) => journey.user, { cascade: true })
  journeys: Journey[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  firstName?: string;

  async comparePassword(password: string): Promise<boolean> {
    try {
      if (!this.password || !password) {
        return false;
      }
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      console.error('Password comparison error:', error);
      return false;
    }
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  toJSON(): Partial<User> {
    const { password, confirmationToken, confirmationTokenExpires, ...rest } = this;
    return {
      ...rest,
      journeys: this.journeys?.map((journey) => ({
        id: journey.id,
        startTime: journey.startTime,
        endTime: journey.endTime,
        locationPoints: journey.locationPoints,
      })) || [],
    };
  }
}