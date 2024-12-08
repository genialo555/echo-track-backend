import { Module } from '@nestjs/common';
import { OptimizationModule } from './optimization/optimization.module';
import { OptimizationController } from './optimization.controller';
import { OptimizationService } from './optimization.service';
import { ScalabilityModule } from './scalability/scalability.module';
import { ScalabilityController } from './scalability.controller';
import { ScalabilityService } from './scalability.service';

@Module({
  imports: [OptimizationModule, ScalabilityModule],
  controllers: [OptimizationController, ScalabilityController],
  providers: [OptimizationService, ScalabilityService]
})
export class PerformanceModule {}
