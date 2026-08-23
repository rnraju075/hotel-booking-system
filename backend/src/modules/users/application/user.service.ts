import {
  AppError
} from "../../../common/errors/app-error.js";

import type {
  UserRepository
} from "./user.repository.js";

import {
  toUserProfileDto,
  type UserProfileDto
} from "./dto/user-profile.dto.js";

export class UserService {

  constructor(
    private readonly userRepository:
      UserRepository
  ) {}

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

  async emailExists(
    email: string
  ): Promise<boolean> {

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await this.userRepository
        .findByEmail(
          normalizedEmail
        );

    return user !== null;
  }
}