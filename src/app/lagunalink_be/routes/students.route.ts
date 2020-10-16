import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';
import { StudentPutController } from '../controllers/students/StudentPutController';

export const register = (router: Router) => {
  const studentPostController: StudentPostController = container.get(
    'App.controllers.students.StudentPostController'
  );
  router.post('/students', (req: Request, res: Response) =>
    studentPostController.run(req, res)
  );

  const studentPutController: StudentPutController = container.get(
    'App.controllers.students.StudentPutController'
  );
  router.put('/students', (req: Request, res: Response) =>
    studentPutController.run(req, res)
  );
};
