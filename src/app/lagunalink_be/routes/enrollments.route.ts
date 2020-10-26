import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { EnrollmentPostController } from '../controllers/enrollments/EnrollmentPostController';
import { EnrollmentDeleteController } from '../controllers/enrollments/EnrollmentDeleteController';
import { EnrollmentsGetController } from '../controllers/enrollments/EnrollmentsGetController';

export const register = (router: Router) => {
  const enrollmentPostController: EnrollmentPostController = container.get(
    'App.controllers.enrollments.EnrollmentPostController'
  );
  router.post('/job_openings/:id/enrollments', (req: Request, res: Response) =>
    enrollmentPostController.run(req, res)
  );

  const enrollmentDeleteController: EnrollmentDeleteController = container.get(
    'App.controllers.enrollments.EnrollmentDeleteController'
  );
  router.delete(
    '/job_openings/enrollments/:id',
    (req: Request, res: Response) => enrollmentDeleteController.run(req, res)
  );

  const enrollmentsGetController: EnrollmentsGetController = container.get(
    'App.controllers.enrollments.EnrollmentsGetController'
  );
  router.get('/job_openings/:id/enrollments', (req: Request, res: Response) =>
    enrollmentsGetController.run(req, res)
  );
};
