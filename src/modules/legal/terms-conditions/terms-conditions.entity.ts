import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { TermsConditionsAcceptance } from '../terms-conditions/terms-conditions-acceptance.entity';

@Entity('terms_conditions') // Nom de la table dans la base de données
export class TermsConditions {
  @PrimaryGeneratedColumn('uuid') // ID unique généré automatiquement
  id: string;

  @Column({ unique: true })
  version: string; // Ajouter la propriété version (unique)

  @Column({ type: 'text', nullable: false }) // Contenu des termes (obligatoire)
  content: string;

  @Column({ type: 'timestamptz', nullable: false }) // Date d'entrée en vigueur avec fuseau horaire
  effectiveDate: Date;

  @OneToMany(() => TermsConditionsAcceptance, (acceptance) => acceptance.termsConditions, {
    cascade: true,
  })
  acceptances: TermsConditionsAcceptance[];

  @CreateDateColumn({ type: 'timestamptz' }) // Date de création automatique
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' }) // Dernière date de mise à jour automatique
  updatedAt: Date;}
