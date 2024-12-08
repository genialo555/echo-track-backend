import { Module } from '@nestjs/common';
import { MultilingualSupportModule } from './multilingual-support.module';
import { RegionalFormatsModule } from './regional-formats.module';
import { RtlLanguagesModule } from './rtl-languages.module';
import { TimezoneSupportModule } from './timezone-support.module';
import { TranslationsModule } from './translations.module';

@Module({
  imports: [MultilingualSupportModule, RegionalFormatsModule, RtlLanguagesModule, TimezoneSupportModule, TranslationsModule]
})
export class ChangeLanguageModule {}
