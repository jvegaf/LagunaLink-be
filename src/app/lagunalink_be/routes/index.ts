import { Router } from 'express';
import status from './status.route';
import auth from './auth.route';
import students from './students.route';

const routes = Router();

routes.use('/status', status);
routes.use('/auth', auth);
routes.use('/students', students);

export default routes;
