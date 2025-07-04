/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // không yêu cầu role -> cho qua
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || typeof user.role !== 'string') {
      throw new ForbiddenException('Bạn không có quyền truy cập!');
    }
    // Nếu muốn block user không cho thao tác (dù là admin/user) khi đã bị khóa, thêm check status:
    if (user.status && user.status === 'blocked') {
      throw new ForbiddenException('Tài khoản của bạn đã bị khóa!');
    }
    return requiredRoles.includes(user.role);
  }
}
