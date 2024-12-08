import { Module } from '@nestjs/common';
import { CsrController } from './csr/csr.controller';
import { CsrService } from './csr/csr.service';

@Module({
  controllers: [CsrController],
  providers: [CsrService]
})
export class CsrModule {}
