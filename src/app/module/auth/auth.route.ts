import { Router } from 'express';
import { AuthController } from './auth.controller';
import validationMiddleware from '../../Middleware/validationMiddleware';
import { userZodValidationSchema } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/signup',
  validationMiddleware(userZodValidationSchema),
  AuthController.createUser,
);

router.post(
  '/login',
  validationMiddleware(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRouter = router;
