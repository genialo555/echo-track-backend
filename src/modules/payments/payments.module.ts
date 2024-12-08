import { Module } from '@nestjs/common';
import { PaymentManagementModule } from './payment-management/payment-management.module';
import { PaymentManagementController } from './payment-management.controller';
import { PaymentManagementService } from './payment-management.service';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistoryService } from './transaction-history.service';

@Module({
  imports: [PaymentManagementModule, TransactionHistoryModule],
  controllers: [PaymentManagementController, TransactionHistoryController],
  providers: [PaymentManagementService, TransactionHistoryService]
})
export class PaymentsModule {}
