import {
  AppError
} from "../../../common/errors/app-error.js";

import type {
  UserEntity
} from "../domain/user.entity.js";

import type {
  UserRepository
} from "./user.repository.js";

import type {
  CreateUserDto
} from "./dto/create-user.dto.js";

import type {
  UpdateUserProfileDto
} from "./dto/update-user-profile.dto.js";

import {
  toUserProfileDto,
  type UserProfileDto
} from "./dto/user-profile.dto.js";

export class UserService {

  constructor(
    private readonly userRepository:
      UserRepository
  ) {}

  async createUser(
    input: CreateUserDto
  ): Promise<UserProfileDto> {

    const email =
      this.normalizeEmail(input.email);

    const existingUser =
      await this.userRepository
        .findByEmail(email);

    if (existingUser) {
      throw new AppError(
        "A user with this email already exists",
        409,
        "USER_EMAIL_ALREADY_EXISTS"
      );
    }

    const user =
      await this.userRepository.create({
        email,

        passwordHash:
          input.passwordHash,

        firstName:
          this.normalizeName(
            input.firstName
          ),

        lastName:
          this.normalizeName(
            input.lastName
          ),

        ...(input.role !== undefined
          ? {
              role: input.role
            }
          : {})
      });

    return toUserProfileDto(user);
  }

  async getUserProfile(
    userId: string
  ): Promise<UserProfileDto> {

    const user =
      await this.userRepository
        .findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404,
        "USER_NOT_FOUND"
      );
    }

    return toUserProfileDto(user);
  }

  async findUserByEmail(
    email: string
  ): Promise<UserEntity | null> {

    return this.userRepository
      .findByEmail(
        this.normalizeEmail(email)
      );
  }

  async emailExists(
    email: string
  ): Promise<boolean> {

    const user =
      await this.findUserByEmail(email);

    return user !== null;
  }

  async updateProfile(
    userId: string,
    input: UpdateUserProfileDto
  ): Promise<UserProfileDto> {

    const existingUser =
      await this.userRepository
        .findById(userId);

    if (!existingUser) {
      throw new AppError(
        "User not found",
        404,
        "USER_NOT_FOUND"
      );
    }

    const firstName =
      input.firstName !== undefined
        ? this.normalizeName(
            input.firstName
          )
        : undefined;

    const lastName =
      input.lastName !== undefined
        ? this.normalizeName(
            input.lastName
          )
        : undefined;

    if (
      firstName === undefined &&
      lastName === undefined
    ) {
      throw new AppError(
        "At least one profile field must be provided",
        400,
        "EMPTY_PROFILE_UPDATE"
      );
    }

    const user =
      await this.userRepository
        .updateProfile(
          userId,
          {
            ...(firstName !== undefined
              ? {
                  firstName
                }
              : {}),

            ...(lastName !== undefined
              ? {
                  lastName
                }
              : {})
          }
        );

    return toUserProfileDto(user);
  }

  private normalizeEmail(
    email: string
  ): string {

    return email
      .trim()
      .toLowerCase();
  }

  private normalizeName(
    value: string
  ): string {

    const normalized =
      value.trim();

    if (
      normalized.length < 1 ||
      normalized.length > 100
    ) {
      throw new AppError(
        "Name must contain between 1 and 100 characters",
        400,
        "INVALID_USER_NAME"
      );
    }

    return normalized;
  }
}