import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from '../dtos/create-journey.dto';
import { UpdateJourneyDto } from '../dtos/update-journey.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { IsUUID } from 'class-validator';

interface RequestWithUser extends Request {
  user?: {
    userId: string;
  };
}

@Controller('journeys')
@UseGuards(JwtAuthGuard)
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Post()
  async createJourney(
    @Req() req: RequestWithUser, 
    @Body() createJourneyDto: CreateJourneyDto
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }
    return this.journeysService.createJourney(userId, createJourneyDto);
  }

  @Get()
  async getJourneys(@Req() req: RequestWithUser) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }
    return this.journeysService.getJourneys(userId);
  }

  @Get(':id')
  async getJourneyById(
    @Req() req: RequestWithUser, 
    @Param('id') id: string
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }

    if (!this.isValidUUID(id)) {
      throw new NotFoundException('Invalid journey ID format');
    }

    const journey = await this.journeysService.getJourneyById(userId, id);
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return journey;
  }

  @Put(':id')
  async updateJourney(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateJourneyDto: UpdateJourneyDto,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }

    if (!this.isValidUUID(id)) {
      throw new NotFoundException('Invalid journey ID format');
    }

    const updatedJourney = await this.journeysService.updateJourney(
      userId,
      id,
      updateJourneyDto
    );
    
    if (!updatedJourney) {
      throw new NotFoundException('Journey not found');
    }

    return updatedJourney;
  }

  @Delete(':id')
  async deleteJourney(
    @Req() req: RequestWithUser, 
    @Param('id') id: string
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('Invalid user ID');
    }

    if (!this.isValidUUID(id)) {
      throw new NotFoundException('Invalid journey ID format');
    }

    return await this.journeysService.deleteJourney(userId, id);
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}