// src/modules/user-management/user-management.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
  import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
  import { RoleGuard } from '@/database/common/guards/role.guard';
  import { Roles } from '@/database/common/decorators/roles.decorators';
  import { Role } from '@/database/common/enums/role.enum';
  import { UserManagementService } from './user-management.service';
  import { CreateUserDto } from '@/modules/users/dtos/create-user.dto';
  import { UpdateUserDto } from '@/modules/users/dtos/update-user.dto';
  @ApiTags('User Management')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Controller('user-management')
  export class UserManagementController {
    constructor(private readonly userManagementService: UserManagementService) {}
  
    @Get()
    @Roles(Role.ADMIN)
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'role', required: false, enum: Role })
    async getAllUsers(
      @Query('page', new ParseIntPipe({ optional: true })) page = 1,
      @Query('limit', new ParseIntPipe({ optional: true })) limit = 10,
      @Query('role') role?: Role,
    ) {
      return this.userManagementService.getAllUsers(page, limit, role);
    }
  
    @Get('stats')
    @Roles(Role.ADMIN)
    async getUserStats() {
      return this.userManagementService.getUserStats();
    }
  
    @Get(':id')
    @Roles(Role.ADMIN)
    async getUserById(@Param('id') id: string) {
      return this.userManagementService.getUserById(id);
    }
  
    @Post()
    @Roles(Role.ADMIN)
    async createUser(@Body() createUserDto: CreateUserDto) {
      return this.userManagementService.createUser(createUserDto);
    }
  
    @Put(':id')
    @Roles(Role.ADMIN)
    async updateUser(
      @Param('id') id: string,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userManagementService.updateUser(id, updateUserDto);
    }
  
    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteUser(@Param('id') id: string) {
      return this.userManagementService.deleteUser(id);
    }
  
    @Put(':id/toggle-status')
    @Roles(Role.ADMIN)
    async toggleUserStatus(@Param('id') id: string) {
      return this.userManagementService.toggleUserStatus(id);
    }
  
    @Put(':id/role')
    @Roles(Role.ADMIN)
    async changeUserRole(
      @Param('id') id: string,
      @Body('role') role: Role,
    ) {
      return this.userManagementService.changeUserRole(id, role);
    }
  }