import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { UsersModule } from '@/modules/users/users.module';
import { Vehicle } from './entities/vehicle.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vehicle]),
        forwardRef(() => UsersModule)
    ],
    controllers: [VehiclesController],
    providers: [VehiclesService],
    exports: [VehiclesService, TypeOrmModule]
})
export class VehiclesModule {}