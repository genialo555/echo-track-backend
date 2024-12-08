// role.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enum';
import { Observable } from 'rxjs';

/**
 * Guard pour vérifier les rôles des utilisateurs.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Récupère les rôles requis définis par le décorateur `Roles`
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      // Si aucun rôle n'est requis, autorise l'accès
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles) {
      return false;
    }
    // Vérifie si l'utilisateur possède au moins un des rôles requis
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
