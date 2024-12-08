import { Module } from '@nestjs/common';
import { ContextualTipsModule } from './contextual-tips/contextual-tips.module';
import { ContextualTipsController } from './contextual-tips.controller';
import { ContextualTipsService } from './contextual-tips.service';
import { TutorialModule } from './tutorial/tutorial.module';
import { TutorialController } from './tutorial.controller';
import { TutorialService } from './tutorial.service';

@Module({
  imports: [ContextualTipsModule, TutorialModule],
  controllers: [ContextualTipsController, TutorialController],
  providers: [ContextualTipsService, TutorialService]
})
export class OnboardingModule {}
