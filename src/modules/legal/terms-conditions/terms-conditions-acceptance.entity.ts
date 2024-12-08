import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';  // Adjust path as needed
import { TermsConditions } from './terms-conditions.entity';

@Entity('terms_conditions_acceptance')
export class TermsConditionsAcceptance {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => TermsConditions, (terms) => terms.acceptances, { onDelete: 'CASCADE' })
  termsConditions: TermsConditions;

  @ManyToOne(() => User, (user) => user.termsConditionsAcceptances, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamptz' })
  acceptedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

  
