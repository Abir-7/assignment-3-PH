import { NextFunction, Request, Response } from 'express';
import { T_UserRole } from '../module/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../module/user/user.model';

export const auth = (...userRole: T_UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not autorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secrete_key as string,
    ) as JwtPayload;

    const { role, email, iat, exp } = decoded;

    const user = await User.findOne({ email: email });
    //check user exixt or not
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
    }
    if (userRole && !userRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unautorized', '');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
