import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';

export const register = (router: Router) => {
  const studentPostController: StudentPostController = container.get(
    'App.controllers.students.StudentPostController'
  );
  router.post('/students', (req: Request, res: Response) =>
    studentPostController.run(req, res)
  );
};
