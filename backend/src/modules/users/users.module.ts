import type {
  PrismaClient
} from "../../generated/prisma/client.js";

import {
  PrismaUserRepository
} from "./infrastructure/prisma-user.repository.js";

import {
  UserService
} from "./application/user.service.js";

export interface UsersModule {
  userService: UserService;
}

export function createUsersModule(
  prisma: PrismaClient
): UsersModule {

  const userRepository =
    new PrismaUserRepository(prisma);

  const userService =
    new UserService(userRepository);

  return {
    userService
  };
}