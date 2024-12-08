// role.guard.spec.ts
import { RoleGuard } from './role.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { beforeEach, describe, it } from 'node:test';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RoleGuard(reflector);
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = createMockExecutionContext();
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access if user does not have required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const context = createMockExecutionContext(['USER']);
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should allow access if user has one of the required roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN, Role.USER]);
    const context = createMockExecutionContext(['USER']);
    expect(guard.canActivate(context)).toBe(true);
  });

  function createMockExecutionContext(userRoles: Role[] = []): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            roles: userRoles,
          },
        }),
      }),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      getType: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    } as unknown as ExecutionContext;
  }
});
function expect(arg0: boolean | Promise<boolean> | import("rxjs").Observable<boolean>) {
  throw new Error('Function not implemented.');
}

