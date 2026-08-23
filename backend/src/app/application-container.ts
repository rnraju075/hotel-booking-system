import {
  prisma
} from "../infrastructure/database/prisma.js";

import {
  SystemService
} from "../modules/system/system.service.js";
import { createUsersModule, UsersModule } from "../modules/users/application/users.module.js";

export interface ApplicationContainer {

  systemService:
    SystemService;

  users:
    UsersModule;
}

export function createApplicationContainer():
  ApplicationContainer {

  const systemService =
    new SystemService();

  const users =
    createUsersModule(
      prisma
    );

  return {
    systemService,
    users
  };
}