// src/modules/auth/services/token-blacklist.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(BlacklistedToken)
    private readonly tokenBlacklistRepository: Repository<BlacklistedToken>,
  ) {}

  /**
   * Ajoute un token à la blacklist.
   * @param token Token JWT à blacklist.
   * @param expiresAt Date d'expiration du token.
   */
  async blacklistToken(token: string, expiresAt: Date): Promise<BlacklistedToken> {
    const blacklistedToken = this.tokenBlacklistRepository.create({
      token,
      expiresAt,
    });
    return this.tokenBlacklistRepository.save(blacklistedToken);
  }

  /**
   * Vérifie si un token est blacklisté.
   * @param token Token JWT à vérifier.
   * @returns Vrai si blacklisté, sinon faux.
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenEntry = await this.tokenBlacklistRepository.findOne({ where: { token } });
    if (!tokenEntry) {
      return false;
    }
    if (tokenEntry.expiresAt < new Date()) {
      // Optionnel : Supprimer les tokens expirés
      await this.tokenBlacklistRepository.remove(tokenEntry);
      return false;
    }
    return true;
  }
}
