import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TermsConditionsService } from './terms-conditions-service';

@Controller('terms-conditions')
export class TermsConditionsController {
  constructor(private readonly termsConditionsService: TermsConditionsService) {}

  // Créer ou mettre à jour des conditions générales
  @Post()
  async createOrUpdate(@Body() body: { version: string; content: string; effectiveDate: string }) {
    const { version, content, effectiveDate } = body;
    return await this.termsConditionsService.createOrUpdateTerms(version, content, new Date(effectiveDate));
  }

  // Récupérer une version spécifique des conditions générales
  @Get(':version')
  async findTerms(@Param('version') version: string) {
    return await this.termsConditionsService.findTermsByVersion(version);
  }

  // Créer une acceptation des conditions générales
  @Post(':version/accept/:userId')
  async acceptTerms(
    @Param('version') version: string,
    @Param('userId') userId: string,
  ) {
    return await this.termsConditionsService.createAcceptance(userId, version);
  }

  // Récupérer toutes les acceptations d'un utilisateur
  @Get('acceptances/:userId')
  async findAcceptances(@Param('userId') userId: string) {
    return await this.termsConditionsService.findAcceptancesByUser(userId);
  }
}
