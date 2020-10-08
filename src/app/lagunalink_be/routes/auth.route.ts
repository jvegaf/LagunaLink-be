import { Router, Request, Response, NextFunction } from 'express';
import container from '../config/dependency-injection';
import { SignUpPostController } from '../controllers/auth/SignUpPostController';
import { EmailVerificationGetController } from '../controllers/auth/EmailVerificationGetController';
import { SignInPostController } from '../controllers/auth/SignInPostController';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

const signUpController: SignUpPostController = container.get(
  'App.controllers.auth.SignUpPostController'
);

const signInController: SignInPostController = container.get(
  'App.controllers.auth.SignInPostController'
);

const emailVerifController: EmailVerificationGetController = container.get(
  'App.controllers.auth.EmailVerificationGetController'
);

router.post('/signup', signUpController.run);

router.post('/signin', signInController.run);

router.get('/email_verification', [checkToken], emailVerifController.run);

export default router;
