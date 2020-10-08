import { Router } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';
import { checkToken } from '../middlewares/checkToken';

const router = Router();

const studentPostController: StudentPostController = container.get(
  'App.controllers.students.StudentPostController'
);

router.post('/students', [checkToken], studentPostController.run);

export default router;
