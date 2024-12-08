import { Module } from '@nestjs/common';
import { AssistantAiModule } from './assistant-ai/assistant-ai.module';
import { AssistantAiController } from './assistant-ai.controller';
import { AssistantAiService } from './assistant-ai.service';
import { PersonalizedModule } from './personalized/personalized.module';
import { PersonalizedController } from './personalized.controller';
import { PersonalizedService } from './personalized.service';

@Module({
  imports: [AssistantAiModule, PersonalizedModule],
  controllers: [AssistantAiController, PersonalizedController],
  providers: [AssistantAiService, PersonalizedService]
})
export class RecommendationsModule {}
