import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { T_User } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { T_UserLogin } from './auth.interface';

const createUserIntoDB = async (userData: T_User) => {
  const result = await User.create(userData);
  return result;
};

const userLogin = async (logInData: T_UserLogin) => {
  //check if user exist
  const user = await User.findOne({ email: logInData.email }).select(['-__v']);
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User not found! Please Check your email.',
    );
  }
  //check password is matched or not
  const isPasswordMatch = await bcrypt.compare(
    logInData.password,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Password not matched! Please check your password',
    );
  }

  //createing user data to include in token
  const userJWtData = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

  // create token
  const accessToken = createToken(
    userJWtData,
    config.jwt_secrete_key as string,
    config.jwt_secrete_date as string,
  );

  return {
    accessToken: `Bearer ${accessToken}`,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
    },
  };
};

export const AuthService = {
  createUserIntoDB,
  userLogin,
};
