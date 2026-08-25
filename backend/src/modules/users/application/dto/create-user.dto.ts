import type {
  UserRole
} from "../../domain/user.entity.js";

export interface CreateUserDto {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}