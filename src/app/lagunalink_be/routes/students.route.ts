import { Router, Request, Response, NextFunction } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';
import { checkToken } from '../middlewares/checkToken';

export const register = (router: Router) => {
  const studentPostController: StudentPostController = container.get(
    'App.controllers.students.StudentPostController'
  );
  router.post(
    '/students',
    async (req: Request, res: Response, next: NextFunction) => {
      await checkToken(req, res, next);
      await studentPostController.run(req, res);
    }
  );
};
