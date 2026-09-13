import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { UserModel } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { catchAsync } from '../utils/catchAsync';
import { config } from '../configs/env.config';
import { logger } from '../configs/logger';
import { AuthResponseDTO, JwtPayload, USER_ROLES, UserDTO, UserRole } from '@mallcity/shared';

const generateToken = (userId: string, email: string, role: UserRole): string => {
  const payload: JwtPayload = { userId, email, role };
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn as any,
  });
};

export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { name, username, email, password, role } = req.body;

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Email is already registered');
  }

  const existingUsername = await UserModel.findOne({ username });
  if (existingUsername) {
    throw new ApiError(httpStatus.CONFLICT, 'Username is already taken');
  }

  // First user in the database automatically receives admin role if no users exist
  const userCount = await UserModel.countDocuments();
  const assignedRole: UserRole = userCount === 0 ? USER_ROLES.ADMIN : (role && role === USER_ROLES.ADMIN ? USER_ROLES.ADMIN : USER_ROLES.USER);

  const user = await UserModel.create({
    name,
    username,
    email,
    password,
    role: assignedRole,
  });

  const token = generateToken(user.id, user.email, user.role);

  const response: AuthResponseDTO = {
    token,
    user: user.toJSON() as unknown as UserDTO,
  };

  logger.info(`User registered successfully: ${user.email} (${user.role})`);
  res.status(httpStatus.CREATED).json(response);
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  const token = generateToken(user.id, user.email, user.role);

  const response: AuthResponseDTO = {
    token,
    user: user.toJSON() as unknown as UserDTO,
  };

  logger.info(`User logged in: ${user.email} (${user.role})`);
  res.status(httpStatus.OK).json(response);
});

export const getMe = catchAsync(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authenticated');
  }

  const user = await UserModel.findById(req.user.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.status(httpStatus.OK).json(user.toJSON());
});

export const getAllUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const users = await UserModel.find().select('-password');
  res.status(httpStatus.OK).json({
    statusMsg: 'Success',
    count: users.length,
    list: users,
  });
});
