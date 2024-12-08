import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { RegisterDto } from '../dtos/register.dto';
import { UserResponseDto } from '../dtos/user.response.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Connexion de l\'utilisateur' })
    @ApiResponse({
        status: 200,
        description: 'Connexion réussie.',
        schema: {
            type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                    example: 'jwt-token'
                },
                expiresIn: {
                    type: 'number',
                    example: 3600
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Identifiants invalides.' })
    async login(
        @Request() req: ExpressRequest & { user: UserResponseDto }
    ): Promise<{ accessToken: string; expiresIn: number }> {
        return this.authService.login(req.user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Inscription d\'un nouvel utilisateur' })
    @ApiResponse({
        status: 201,
        description: 'Utilisateur créé avec succès.',
        type: UserResponseDto
    })
    @ApiResponse({ status: 400, description: 'Données invalides.' })
    @ApiResponse({ status: 409, description: 'Email déjà utilisé.' })
    async register(@Body() registerDto: RegisterDto): Promise<{
        statusCode: number;
        message: string;
        data: UserResponseDto;
    }> {
        const user = await this.authService.register(registerDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Utilisateur créé avec succès',
            data: user
        };
    }
}