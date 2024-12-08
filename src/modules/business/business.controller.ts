import { Controller, Post, Put, Delete, Get, Body, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { UserResponseDto } from '../auth/dtos/user.response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

export class BusinessUsersResponse {
    users: UserResponseDto[];
    total: number;
    page: number;
    totalPages: number;
}

interface BusinessUserResponse {
    message: string;
    user: UserResponseDto;
}

interface BusinessDeleteResponse {
    message: string;
}

@ApiTags('business')
@Controller('business')
export class BusinessController {
    constructor(private readonly businessService: BusinessService) {}

    @Post('create-user')
    @ApiOperation({ summary: 'Créer un nouvel utilisateur business' })
    @ApiResponse({
        status: 201,
        description: 'Utilisateur créé avec succès.',
        type: UserResponseDto
    })
    @ApiResponse({
        status: 500,
        description: 'Erreur interne du serveur.'
    })
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<BusinessUserResponse> {
        const user = await this.businessService.createUser(createUserDto);
        return {
            message: 'Business user created successfully',
            user
        };
    }

    @Put('update-user/:id')
    @ApiOperation({ summary: 'Mettre à jour un utilisateur business' })
    @ApiResponse({
        status: 200,
        description: 'Utilisateur mis à jour avec succès.',
        type: UserResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'Utilisateur non trouvé.'
    })
    @ApiResponse({
        status: 500,
        description: 'Erreur interne du serveur.'
    })
    async updateUser(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<BusinessUserResponse> {
        const user = await this.businessService.updateUser(id, updateUserDto);
        return {
            message: 'Business user updated successfully',
            user
        };
    }

    @Delete('delete-user/:id')
    @ApiOperation({ summary: 'Supprimer un utilisateur business' })
    @ApiResponse({
        status: 200,
        description: 'Utilisateur supprimé avec succès.'
    })
    @ApiResponse({
        status: 404,
        description: 'Utilisateur non trouvé.'
    })
    @ApiResponse({
        status: 500,
        description: 'Erreur interne du serveur.'
    })
    async deleteUser(
        @Param('id', new ParseUUIDPipe()) id: string
    ): Promise<BusinessDeleteResponse> {
        await this.businessService.deleteUser(id);
        return {
            message: 'Business user deleted successfully'
        };
    }

    @Get('users')
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs business' })
    @ApiResponse({
        status: 200,
        description: 'Liste des utilisateurs récupérée avec succès.',
        type: BusinessUsersResponse
    })
    @ApiResponse({
        status: 500,
        description: 'Erreur interne du serveur.'
    })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    async getAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<BusinessUsersResponse> {
        return await this.businessService.getAllUsers(page, limit);
    }
}