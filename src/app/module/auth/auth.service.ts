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
  const user = await User.findOne({ email: logInData.email }).select(['-__v']);
  if (!user) {
    return user;
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found! Please Check your email.',
    );
  }
  const isPasswordMatch = await bcrypt.compare(
    logInData.password,
    user.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Password not matched! Please check your password',
    );
  }
  console.log(user._id, 'auth');
  //createing access token
  const userJWtData = {
    email: user.email,
    role: user.role,
    id: user._id,
  };

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
