import { Module } from '@nestjs/common';
import { ChangeLanguageService } from './change-language.service';
import { MultilingualSupportService } from './multilingual-support.service';
import { RegionalFormatsService } from './regional-formats.service';
import { RtlLanguagesService } from './rtl-languages.service';
import { TimezoneSupportService } from './timezone-support.service';
import { TranslationsService } from './translations.service';
import { ChangeLanguageController } from './change-language.controller';
import { MultilingualSupportController } from './multilingual-support.controller';
import { RegionalFormatsController } from './regional-formats.controller';
import { RtlLanguagesController } from './rtl-languages.controller';
import { TimezoneSupportController } from './timezone-support.controller';
import { TranslationsController } from './translations.controller';
import { ChangeLanguageModule } from './change-language.module';

@Module({
  providers: [ChangeLanguageService, MultilingualSupportService, RegionalFormatsService, RtlLanguagesService, TimezoneSupportService, TranslationsService],
  controllers: [ChangeLanguageController, MultilingualSupportController, RegionalFormatsController, RtlLanguagesController, TimezoneSupportController, TranslationsController],
  imports: [ChangeLanguageModule]
})
export class InternationalizationModule {}
