import { Router } from 'express';
import container from '../config/dependency-injection';
import StatusController from '../controllers/status/StatusGetController';

const router = Router();

const controller: StatusController = container.get(
  'App.controllers.status.StatusGetController'
);

router.get('/', controller.run);

export default router;
