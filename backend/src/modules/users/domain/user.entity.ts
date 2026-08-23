export const USER_ROLES = [
  "CUSTOMER",
  "HOTEL_MANAGER",
  "ADMIN"
] as const;

export type UserRole =
  (typeof USER_ROLES)[number];

export interface UserEntity {
  id: string;

  email: string;

  passwordHash: string;

  firstName: string;

  lastName: string;

  role: UserRole;

  isActive: boolean;

  createdAt: Date;

  updatedAt: Date;
}