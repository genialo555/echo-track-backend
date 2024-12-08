import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Get,
  ParseUUIDPipe,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('vehicles')
@UseGuards(AuthGuard('jwt'))
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Req() req: RequestWithUser, @Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(req.user.id, createVehicleDto);
  }

  @Put(':id')
  async update(
    @Req() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    const updatedVehicle = await this.vehiclesService.update(req.user.id, id, updateVehicleDto);
    if (!updatedVehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return updatedVehicle;
  }

  @Delete(':id')
  async remove(@Req() req: RequestWithUser, @Param('id', new ParseUUIDPipe()) id: string) {
    try {
      await this.vehiclesService.remove(req.user.id, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove vehicle');
    }
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    return this.vehiclesService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Req() req: RequestWithUser, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.vehiclesService.findOne(req.user.id, id);
  }
}
