import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { EnrollmentPostController } from '../controllers/enrollments/EnrollmentPostController';
import { EnrollmentDeleteController } from '../controllers/enrollments/EnrollmentDeleteController';
import { EnrollmentsGetController } from '../controllers/enrollments/EnrollmentsGetController';
import { authChecker } from '../middlewares/authChecker';
import { userOwnChecker } from '../middlewares/userOwnChecker';
import { companyRoleChecker } from '../middlewares/companyRoleChecker';
import { EnrollmentsFetchController } from '../controllers/enrollments/EnrollmentsFetchController';
import { studentRoleChecker } from '../middlewares/studentRoleChecker';

export const register = (router: Router) => {
  const enrollmentPostController: EnrollmentPostController = container.get(
    'App.controllers.enrollments.EnrollmentPostController'
  );
  router.post('/job_openings/:id/enrollments', authChecker, studentRoleChecker, (req: Request, res: Response) =>
    enrollmentPostController.run(req, res)
  );

  const enrollmentDeleteController: EnrollmentDeleteController = container.get(
    'App.controllers.enrollments.EnrollmentDeleteController'
  );
  router.delete('/enrollments/:id', authChecker, studentRoleChecker, (req: Request, res: Response) =>
    enrollmentDeleteController.run(req, res)
  );

  const enrollmentsGetController: EnrollmentsGetController = container.get(
    'App.controllers.enrollments.EnrollmentsGetController'
  );
  router.get('/job_openings/:id/enrollments', authChecker, companyRoleChecker, (req: Request, res: Response) =>
    enrollmentsGetController.run(req, res)
  );

  const enrollmentsStudentFetchController: EnrollmentsFetchController = container.get(
    'App.controllers.enrollments.EnrollmentsFetchController'
  );

  router.get('/students/:id/enrollments', authChecker, userOwnChecker, (req: Request, res: Response) =>
    enrollmentsStudentFetchController.run(req, res)
  );
};
