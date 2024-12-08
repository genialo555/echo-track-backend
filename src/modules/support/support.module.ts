import { Module } from '@nestjs/common';
import { ContactSupportModule } from './contact-support/contact-support.module';
import { ContactSupportController } from './contact-support.controller';
import { ContactSupportService } from './contact-support.service';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { HelpCenterModule } from './help-center/help-center.module';
import { HelpCenterController } from './help-center.controller';
import { HelpCenterService } from './help-center.service';

@Module({
  imports: [ContactSupportModule, FeedbackModule, HelpCenterModule],
  controllers: [ContactSupportController, FeedbackController, HelpCenterController],
  providers: [ContactSupportService, FeedbackService, HelpCenterService]
})
export class SupportModule {}
