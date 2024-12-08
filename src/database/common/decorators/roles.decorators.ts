// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

/**
 * Clé de métadonnées pour les rôles.
 */
export const ROLES_KEY = 'roles';

/**
 * Décorateur pour définir les rôles requis pour une route.
 * @param roles Liste des rôles autorisés.
 * @returns Décorateur de métadonnées.
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
