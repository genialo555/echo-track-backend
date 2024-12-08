import { Module } from '@nestjs/common';
import { WebinarsModule } from './webinars/webinars.module';
import { WebinarsController } from './webinars.controller';
import { WebinarsService } from './webinars.service';

@Module({
  imports: [WebinarsModule],
  controllers: [WebinarsController],
  providers: [WebinarsService]
})
export class CommunityModule {}
