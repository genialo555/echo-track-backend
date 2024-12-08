import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsConditions } from './terms-conditions.entity'; 
import { TermsConditionsAcceptance } from './terms-conditions-acceptance.entity'; 
import { TermsConditionsService } from './terms-conditions-service';
import { TermsConditionsController } from './terms-conditions.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([TermsConditions, TermsConditionsAcceptance]), // Enregistrement des entités
  ],
  controllers: [TermsConditionsController], // Contrôleur associé
  providers: [TermsConditionsService], // Service associé
  exports: [TermsConditionsService], // Export si utilisé dans d'autres modules
})
export class TermsConditionsModule {}
