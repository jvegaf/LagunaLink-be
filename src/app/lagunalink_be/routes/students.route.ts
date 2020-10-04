import { Router, Request, Response, NextFunction } from 'express';
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
    async (req: Request, res: Response, next: NextFunction) => {
      checkToken(req, res, next);
      checkRole(['ROLE_STUDENT']);
      await studentPostController.run(req, res);
    }
  );
};
