// src/modules/security/alerts.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('alerts')
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer les alertes' })
  @ApiResponse({ status: 200, description: 'Liste des alertes récupérée avec succès.', type: [String] })
  async getAlerts(): Promise<string[]> {
    return this.alertsService.getAlerts();
  }
}
