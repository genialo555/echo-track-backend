// src/modules/auth/services/jwt.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface TokenPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: TokenPayload): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        issuer: this.configService.get<string>('JWT_ISSUER', 'your-app-name'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION', '1d'),
      });
    } catch (error) {
      throw new UnauthorizedException('Could not generate token');
    }
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async decodeToken(token: string): Promise<TokenPayload | null> {
    try {
      return this.jwtService.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        issuer: this.configService.get<string>('JWT_ISSUER', 'your-app-name'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
      });
    } catch (error) {
      throw new UnauthorizedException('Could not generate refresh token');
    }
  }

  async generateTokenPair(payload: TokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}