import { UserRole } from './roles';

export interface UserDTO {
  id?: string;
  _id?: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface RegisterRequestDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserDTO;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
