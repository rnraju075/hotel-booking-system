import type {
  PrismaClient
} from "../../../generated/prisma/client.js";

import type {
  UserEntity
} from "../domain/user.entity.js";

import type {
  CreateUserData,
  UpdateUserProfileData,
  UserRepository
} from "../application/user.repository.js";

export class PrismaUserRepository
  implements UserRepository {

  constructor(
    private readonly prisma:
      PrismaClient
  ) {}

  async create(
    data: CreateUserData
  ): Promise<UserEntity> {

    const user =
      await this.prisma.user.create({
        data: {
          email:
            data.email,

          passwordHash:
            data.passwordHash,

          firstName:
            data.firstName,

          lastName:
            data.lastName,

          ...(data.role !== undefined
            ? {
                role: data.role
              }
            : {})
        }
      });

    return user;
  }

  async findById(
    id: string
  ): Promise<UserEntity | null> {

    return this.prisma.user.findUnique({
      where: {
        id
      }
    });
  }

  async findByEmail(
    email: string
  ): Promise<UserEntity | null> {

    return this.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  async updateProfile(
    id: string,
    data: UpdateUserProfileData
  ): Promise<UserEntity> {

    return this.prisma.user.update({
      where: {
        id
      },

      data: {
        ...(data.firstName !== undefined
          ? {
              firstName:
                data.firstName
            }
          : {}),

        ...(data.lastName !== undefined
          ? {
              lastName:
                data.lastName
            }
          : {})
      }
    });
  }
}