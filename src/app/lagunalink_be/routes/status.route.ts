import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import StatusController from "../controllers/status/StatusGetController";

export const register = (router: Router) => {
  const controller: StatusController = container.get('App.controllers.status.StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
