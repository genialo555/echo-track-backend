import { Module } from '@nestjs/common';
import { AccessibilityModule } from './accessibility/accessibility.module';
import { AccessibilityController } from './accessibility.controller';
import { AccessibilityService } from './accessibility.service';
import { AddLogoModule } from './add-logo/add-logo.module';
import { AddLogoController } from './add-logo.controller';
import { AddLogoService } from './add-logo.service';
import { EmployerModule } from './employer/employer.module';
import { EnhanceGraphsModule } from './enhance-graphs/enhance-graphs.module';
import { EnhanceGraphsController } from './enhance-graphs.controller';
import { EnhanceGraphsService } from './enhance-graphs.service';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { ErrorHandlingController } from './error-handling.controller';
import { ErrorHandlingService } from './error-handling.service';

@Module({
  imports: [AccessibilityModule, AddLogoModule, EmployerModule, EnhanceGraphsModule, ErrorHandlingModule],
  controllers: [AccessibilityController, AddLogoController, EnhanceGraphsController, ErrorHandlingController],
  providers: [AccessibilityService, AddLogoService, EnhanceGraphsService, ErrorHandlingService]
})
export class UiuxModule {}
