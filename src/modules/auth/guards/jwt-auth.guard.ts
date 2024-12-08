import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

/**
 * JwtAuthGuard : protège les routes en vérifiant la présence et la validité d'un token JWT.
 * Extends AuthGuard pour utiliser la stratégie 'jwt'.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  /**
   * Permet d'activer ou non le guard.
   * Peut être surchargée pour ajouter des conditions spécifiques avant d'autoriser l'accès.
   * 
   * @param context - Le contexte d'exécution de la requête
   * @returns {Promise<boolean>} - Retourne true si l'accès est autorisé
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Vous pouvez ajouter des vérifications supplémentaires ici si nécessaire
    return super.canActivate(context) as Promise<boolean>;
  }

  /**
   * Gère la réponse après la validation par la stratégie JWT.
   * Si une erreur est détectée ou si le token est invalide, une exception est levée.
   * 
   * @param err - Erreur détectée lors de l'authentification
   * @param user - Utilisateur extrait du token JWT
   * @param info - Informations supplémentaires sur l'échec (ex: token expiré)
   * @returns {any} - L'utilisateur authentifié si valide
   * @throws {UnauthorizedException} - Si l'utilisateur n'est pas authentifié
   */
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      // Gérer les cas d'erreurs spécifiques (par exemple, expiration du token)
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Votre session a expiré, veuillez vous reconnecter.');
      }

      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token invalide, veuillez vous reconnecter.');
      }

      // Exception générique pour tout autre cas
      throw err || new UnauthorizedException('Accès non autorisé');
    }

    // Retourner l'utilisateur si tout est correct
    return user;
  }

  /**
   * Récupère l'objet Request depuis le contexte pour un typage plus précis.
   * Utile si vous souhaitez interagir directement avec l'objet `req`.
   * 
   * @param context - Le contexte d'exécution de la requête
   * @returns {Request} - L'objet Request typé
   */
  getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest<Request>();
  }
}
