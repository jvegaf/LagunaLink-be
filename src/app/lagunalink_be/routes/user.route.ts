import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { ProfileGetController } from '../controllers/user/ProfileGetController';
import { authChecker } from '../middlewares/authChecker';

export const register = (router: Router) => {
  const profileGetController: ProfileGetController = container.get('App.controllers.user.ProfileGetController');
  router.get('/user/profile', authChecker, (req: Request, res: Response) => profileGetController.run(req, res));
};
