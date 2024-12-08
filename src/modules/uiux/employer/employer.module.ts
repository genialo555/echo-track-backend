import { Module } from '@nestjs/common';
import { AdvancedChartsModule } from './advanced-charts/advanced-charts.module';
import { AdvancedChartsController } from './advanced-charts.controller';
import { AdvancedChartsService } from './advanced-charts.service';
import { EnhancedInteractivityModule } from './enhanced-interactivity/enhanced-interactivity.module';
import { EnhancedInteractivityController } from './enhanced-interactivity.controller';
import { EnhancedInteractivityService } from './enhanced-interactivity.service';

@Module({
  imports: [AdvancedChartsModule, EnhancedInteractivityModule],
  controllers: [AdvancedChartsController, EnhancedInteractivityController],
  providers: [AdvancedChartsService, EnhancedInteractivityService]
})
export class EmployerModule {}
