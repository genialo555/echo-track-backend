import { Module } from '@nestjs/common';
import { GlobalSearchModule } from './global-search/global-search.module';
import { GlobalSearchController } from './global-search.controller';
import { GlobalSearchService } from './global-search.service';

@Module({
  imports: [GlobalSearchModule],
  controllers: [GlobalSearchController],
  providers: [GlobalSearchService]
})
export class SearchModule {}
