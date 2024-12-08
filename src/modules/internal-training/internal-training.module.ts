import { Module } from '@nestjs/common';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { KnowledgeBaseController } from './knowledge-base.controller';
import { KnowledgeBaseService } from './knowledge-base.service';

@Module({
  imports: [KnowledgeBaseModule],
  controllers: [KnowledgeBaseController],
  providers: [KnowledgeBaseService]
})
export class InternalTrainingModule {}
