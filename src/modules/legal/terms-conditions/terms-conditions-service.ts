import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TermsConditions } from './terms-conditions.entity';
import { TermsConditionsAcceptance } from './terms-conditions-acceptance.entity'; 

@Injectable()
@Injectable()
export class TermsConditionsService {
  constructor(
    @InjectRepository(TermsConditions)
    private readonly termsConditionsRepository: Repository<TermsConditions>,
    @InjectRepository(TermsConditionsAcceptance)
    private readonly termsConditionsAcceptanceRepository: Repository<TermsConditionsAcceptance>,
  ) {}

  // Créer ou mettre à jour les conditions générales
  async createOrUpdateTerms(version: string, content: string, effectiveDate: Date): Promise<TermsConditions> {
    const existingTerms = await this.termsConditionsRepository.findOne({ where: { version } });
    if (existingTerms) {
      existingTerms.content = content;
      existingTerms.effectiveDate = effectiveDate;
      return this.termsConditionsRepository.save(existingTerms);
    }
    const newTerms = this.termsConditionsRepository.create({ version, content, effectiveDate });
    return this.termsConditionsRepository.save(newTerms);
  }

  // Récupérer les conditions générales par version
  async findTermsByVersion(version: string): Promise<TermsConditions> {
    const terms = await this.termsConditionsRepository.findOne({ where: { version } });
    if (!terms) {
      throw new NotFoundException('Terms and conditions not found');
    }
    return terms;
  }

  // Créer une acceptation
  async createAcceptance(userId: string, termsVersion: string): Promise<TermsConditionsAcceptance> {
    const terms = await this.findTermsByVersion(termsVersion);

    const acceptance = this.termsConditionsAcceptanceRepository.create({
      user: { id: userId }, // TypeORM résoudra cette relation
      termsConditions: terms,
      acceptedAt: new Date(),
    });

    return this.termsConditionsAcceptanceRepository.save(acceptance);
  }

  // Récupérer les acceptations par utilisateur
  async findAcceptancesByUser(userId: string): Promise<TermsConditionsAcceptance[]> {
    return this.termsConditionsAcceptanceRepository.find({
      where: { user: { id: userId } },
      relations: ['termsConditions'],
    });
  }
}