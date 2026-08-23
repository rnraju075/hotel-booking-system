import type {
  UserEntity
} from "../domain/user.entity.js";

export interface UserRepository {
  findById(
    id: string
  ): Promise<UserEntity | null>;

  findByEmail(
    email: string
  ): Promise<UserEntity | null>;
}