import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import { SignUpPostController } from '../controllers/auth/SignUpPostController';
import { EmailVerificationGetController } from '../controllers/auth/EmailVerificationGetController';
import { SignInPostController } from '../controllers/auth/SignInPostController';
import { checkToken } from '../middlewares/checkToken';

export const register = (router: Router) => {
  const signUpController: SignUpPostController = container.get(
    'App.controllers.auth.SignUpPostController'
  );
  router.post('/auth/signup', (req: Request, res: Response) =>
    signUpController.run(req, res)
  );

  const signInController: SignInPostController = container.get(
    'App.controllers.auth.SignInPostController'
  );
  router.post('/auth/signin', (req: Request, res: Response) =>
    signInController.run(req, res)
  );

  const emailVerifController: EmailVerificationGetController = container.get(
    'App.controllers.auth.EmailVerificationGetController'
  );
  router.get(
    '/auth/email_verification',
    [checkToken],
    (req: Request, res: Response) => emailVerifController.run(req, res)
  );
};
