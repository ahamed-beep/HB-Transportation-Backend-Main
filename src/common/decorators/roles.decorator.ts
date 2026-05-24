import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export type Role = 'admin';
export const RequireRole = (...roles: Role[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);