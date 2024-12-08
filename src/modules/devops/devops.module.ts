import { Module } from '@nestjs/common';
import { DevopsController } from './devops/devops.controller';
import { DevopsService } from './devops/devops.service';

@Module({
  controllers: [DevopsController],
  providers: [DevopsService]
})
export class DevopsModule {}
