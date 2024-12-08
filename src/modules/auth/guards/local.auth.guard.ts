// src/auth/guards/local-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard pour gérer l'authentification locale (email/mot de passe).
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
