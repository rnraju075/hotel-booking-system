import type {
  UserEntity
} from "../../domain/user.entity.js";

export interface UserProfileDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  role: UserEntity["role"];

  isActive: boolean;

  createdAt: Date;
}

export function toUserProfileDto(
  user: UserEntity
): UserProfileDto {
  return {
    id: user.id,

    email: user.email,

    firstName: user.firstName,

    lastName: user.lastName,

    role: user.role,

    isActive: user.isActive,

    createdAt: user.createdAt
  };
}