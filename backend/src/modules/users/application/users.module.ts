import { PrismaClient } from "@prisma/client/extension";
import { PrismaUserRepository } from "../infrastructure/prisma-user.repository.js";
import { UserService } from "./user.service.js";

export interface UsersModule {
  userService: UserService;
}

export function createUsersModule(
  prisma: PrismaClient
): UsersModule {

  const userRepository =
    new PrismaUserRepository(
      prisma
    );

  const userService =
    new UserService(
      userRepository
    );

  return {
    userService
  };
}