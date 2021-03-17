import { Router, Request, Response } from 'express';
import { AvatarGetController } from '../controllers/avatar/AvatarGetController';
import container from '../config/dependency-injection';
import { authChecker } from '../middlewares/authChecker';
import { AvatarPutController } from '../controllers/avatar/AvatarPutController';
import { userOwnChecker } from '../middlewares/userOwnChecker';
import { AvatarDeleteController } from '../controllers/avatar/AvatarDeleteController';
import upload from '../../../Contexts/LLBE/Users/infrastructure/persistence/multer/multer';

export const register = (router: Router) => {
  const avatarGetController: AvatarGetController = container.get('App.controllers.avatar.AvatarGetController');
  router.get('/avatar/{id}', authChecker, (req: Request, res: Response) => avatarGetController.run(req, res));

  const avatarPutController: AvatarPutController = container.get('App.controllers.avatar.AvatarPutController');
  router.put('/avatar/{id}', authChecker, userOwnChecker, upload.single('image'), (req: Request, res: Response) => avatarPutController.run(req, res));

  const avatarDeleteController: AvatarDeleteController = container.get('App.controllers.avatar.AvatarDeleteController');
  router.delete('/avatar/{id}', authChecker, userOwnChecker, (req: Request, res: Response) => avatarDeleteController.run(req, res));


};
