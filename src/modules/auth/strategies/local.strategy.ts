import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';  // Notez le changement ici
import { AuthService } from '../services/auth.service';
import { UserResponseDto } from '../dtos/user.response.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string): Promise<UserResponseDto> {
        try {
            const userFromAuth = await this.authService.validateUser(email, password);
            
            if (!userFromAuth) {
                throw new UnauthorizedException('Identifiants invalides');
            }

            if (!userFromAuth.id || !userFromAuth.email) {
                throw new UnauthorizedException('Données utilisateur invalides');
            }

            return new UserResponseDto(userFromAuth);
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException('Erreur lors de la validation');
        }
    }
}