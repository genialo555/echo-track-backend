// src/modules/business/business.module.ts
import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { UsersModule } from '../users/users.module'; // Exemple de dépendance

@Module({
  imports: [UsersModule], // Importez les modules nécessaires
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
