import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import { SignUpPostController } from "../controllers/auth/SignUpPostController";

export const register = (router: Router) => {
  const controller: SignUpPostController = container.get('App.controllers.auth.SignUpPostController');
  router.post('/auth/signup', (req: Request, res: Response) => controller.run(req, res));
};
