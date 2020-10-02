import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';
import { checkToken } from '../middlewares/checkToken';
import { checkRole } from '../middlewares/checkRole';

export const register = (router: Router) => {
  const studentPostController: StudentPostController = container.get(
    'App.controllers.students.StudentPostController'
  );
  router.post(
    '/students',
    [checkToken, checkRole(['ROLE_STUDENT'])],
    (req: Request, res: Response) => studentPostController.run(req, res)
  );
};
