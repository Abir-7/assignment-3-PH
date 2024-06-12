import { model, Schema } from 'mongoose';
import { T_User } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpstatus from 'http-status';
import { userRole } from './user.const';
export const userSchema = new Schema<T_User>({
  name: { type: String, required: [true, 'User name is required'] },
  email: {
    type: String,
    required: [true, 'User email is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'User password is required'] },
  phone: { type: String, required: [true, 'User mobile is required'] },
  role: {
    type: String,
    enum: userRole,
    required: [true, 'User role is required'],
  },
  address: { type: String, required: [true, 'User address is required'] },
});

userSchema.pre('save', async function (next) {
  const userData = this;

  const isUserExist = await User.findOne({ email: userData.email });
  if (isUserExist) {
    throw new AppError(httpstatus.CONFLICT, 'User already exist');
  }
  userData.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sault_round),
  );
  next();
});
userSchema.post('save', async function (data) {
  data.password = '**********************';
});
export const User = model<T_User>('User', userSchema);
