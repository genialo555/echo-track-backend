import { Module } from '@nestjs/common';
import { DataPrivacyController } from './data-privacy/data-privacy.controller';
import { DataPrivacyService } from './data-privacy/data-privacy.service';

@Module({
  controllers: [DataPrivacyController],
  providers: [DataPrivacyService]
})
export class DataPrivacyModule {}
