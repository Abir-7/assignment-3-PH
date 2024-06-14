import { RequestHandler } from 'express';
import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await AuthService.createUserIntoDB(userData);
  return sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.userLogin(loginData);

  return res.status(200).send({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.user,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
