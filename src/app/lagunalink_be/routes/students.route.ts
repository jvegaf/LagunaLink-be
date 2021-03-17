import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { StudentPostController } from '../controllers/students/StudentPostController';
import { StudentPutController } from '../controllers/students/StudentPutController';
import { StudentGetController } from '../controllers/students/StudentGetController';
import { authChecker } from '../middlewares/authChecker';
import { userOwnChecker } from '../middlewares/userOwnChecker';
import { studentRoleChecker } from '../middlewares/studentRoleChecker';

export const register = (router: Router) => {
  const studentGetController: StudentGetController = container.get('App.controllers.students.StudentGetController');

  router.get('/students/:id', authChecker, studentRoleChecker, (req: Request, res: Response) =>
    studentGetController.run(req, res)
  );
  const studentPostController: StudentPostController = container.get('App.controllers.students.StudentPostController');
  router.post('/students', authChecker, studentRoleChecker, (req: Request, res: Response) =>
    studentPostController.run(req, res)
  );

  const studentPutController: StudentPutController = container.get('App.controllers.students.StudentPutController');
  router.put('/students/:id', authChecker, userOwnChecker, (req: Request, res: Response) =>
    studentPutController.run(req, res)
  );
};
