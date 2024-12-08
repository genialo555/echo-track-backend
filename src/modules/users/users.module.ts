import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { User } from './entities/user.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { RoleGuard } from 'src/database/common/guards/role.guard';
import { Reflector } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { StorageService } from '../common/storage.service';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Vehicle]),
        ConfigModule,
        forwardRef(() => VehiclesModule),
        MulterModule.register({
            dest: './uploads/profile-images',
            limits: { fileSize: 5 * 1024 * 1024 },
        }),
    ],
    providers: [
        UsersService,
        RoleGuard,
        Reflector,
        StorageService
    ],
    controllers: [UsersController],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}