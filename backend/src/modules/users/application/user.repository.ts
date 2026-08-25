import type {
  UserEntity,
  UserRole
} from "../domain/user.entity.js";

export interface CreateUserData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
}

export interface UserRepository {
  create(
    data: CreateUserData
  ): Promise<UserEntity>;

  findById(
    id: string
  ): Promise<UserEntity | null>;

  findByEmail(
    email: string
  ): Promise<UserEntity | null>;

  updateProfile(
    id: string,
    data: UpdateUserProfileData
  ): Promise<UserEntity>;
}