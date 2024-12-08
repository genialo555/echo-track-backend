import { Module } from '@nestjs/common';
import { InAppPurchasesController } from './in-app-purchases/in-app-purchases.controller';
import { InAppPurchasesService } from './in-app-purchases/in-app-purchases.service';

@Module({
  controllers: [InAppPurchasesController],
  providers: [InAppPurchasesService]
})
export class InAppPurchasesModule {}
