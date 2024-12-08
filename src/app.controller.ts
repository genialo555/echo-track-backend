import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './modules/users/users/users.service';
import { VehiclesService } from './modules/vehicles/vehicles/vehicles.service';
import { TermsConditionsService } from './modules/legal/terms-conditions/terms-conditions-service';
import { CreateUserDto } from './modules/users/dtos/create-user.dto';
import { UpdateUserDto } from './modules/users/dtos/update-user.dto';
import { CreateVehicleDto } from './modules/vehicles/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './modules/vehicles/dtos/update-vehicle.dto';
import { Request } from 'express';

// Interface pour les requêtes authentifiées
interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
  };
}

@Controller('app')
@UseGuards(AuthGuard('jwt')) // Protection des routes via JWT
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly vehiclesService: VehiclesService,
    private readonly termsConditionsService: TermsConditionsService,
  ) {}

  // === USERS ===

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('users/:id')
  async getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findById(id);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.remove(id);
  }

  // === VEHICLES ===

  @Post('vehicles')
  async createVehicle(
    @Req() req: RequestWithUser,
    @Body() createVehicleDto: CreateVehicleDto,
  ) {
    return await this.vehiclesService.create(req.user.id, createVehicleDto);
  }

  @Get('vehicles')
  async getAllVehicles(@Req() req: RequestWithUser) {
    return await this.vehiclesService.findAll(req.user.id);
  }

  @Get('vehicles/:id')
  async getVehicle(
    @Req() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.vehiclesService.findOne(req.user.id, id);
  }

  @Put('vehicles/:id')
  async updateVehicle(
    @Req() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return await this.vehiclesService.update(req.user.id, id, updateVehicleDto);
  }

  @Delete('vehicles/:id')
  async deleteVehicle(
    @Req() req: RequestWithUser,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.vehiclesService.remove(req.user.id, id);
  }

  // === TERMS & CONDITIONS ===

  @Post('terms-conditions')
  async createOrUpdateTerms(
    @Body() body: { version: string; content: string; effectiveDate: string },
  ) {
    const { version, content, effectiveDate } = body;
    return await this.termsConditionsService.createOrUpdateTerms(
      version,
      content,
      new Date(effectiveDate),
    );
  }

  @Get('terms-conditions/:version')
  async getTermsByVersion(@Param('version') version: string) {
    return await this.termsConditionsService.findTermsByVersion(version);
  }

  @Post('terms-conditions/:version/accept')
  async acceptTermsConditions(
    @Req() req: RequestWithUser,
    @Param('version') version: string,
  ) {
    return await this.termsConditionsService.createAcceptance(req.user.id, version);
  }

  @Get('terms-conditions/acceptances/:userId')
  async getAcceptancesByUser(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return await this.termsConditionsService.findAcceptancesByUser(userId);
  }
  }

