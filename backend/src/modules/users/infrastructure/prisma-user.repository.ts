import type {
  PrismaClient
} from "../../../generated/prisma/client.js";

import type {
  UserEntity
} from "../domain/user.entity.js";

import type {
  UserRepository
} from "../application/user.repository.js";

export class PrismaUserRepository
  implements UserRepository {

  constructor(
    private readonly prisma:
      PrismaClient
  ) {}

  async findById(
    id: string
  ): Promise<UserEntity | null> {

    const user =
      await this.prisma.user.findUnique({
        where: {
          id
        }
      });

    return user;
  }

  async findByEmail(
    email: string
  ): Promise<UserEntity | null> {

    const user =
      await this.prisma.user.findUnique({
        where: {
          email
        }
      });

    return user;
  }
}