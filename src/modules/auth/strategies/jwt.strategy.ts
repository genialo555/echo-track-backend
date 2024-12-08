import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users/users.service';
import { UserResponseDto } from '../dtos/user.response.dto';

interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        const secretKey = configService.get<string>('JWT_SECRET');
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,
        });
    }

    async validate(payload: JwtPayload): Promise<UserResponseDto> {
        const user = await this.usersService.findById(payload.sub);
        
        if (!user) {
            throw new UnauthorizedException('Utilisateur non trouvé');
        }

        return new UserResponseDto(user);
    }
}