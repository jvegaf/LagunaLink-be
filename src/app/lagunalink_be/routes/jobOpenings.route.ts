import { NextFunction, Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { JobOpeningPostController } from '../controllers/jobOpenings/JobOpeningPostController';
import { JobOpeningPutController } from '../controllers/jobOpenings/JobOpeningPutController';
import { JobOpeningDeleteController } from '../controllers/jobOpenings/JobOpeningDeleteController';
import { JobOpeningGetController } from '../controllers/jobOpenings/JobOpeningGetController';
import { JobOpeningFetchController } from '../controllers/jobOpenings/JobOpeningFetchController';
import { authChecker } from '../middlewares/authChecker';
import { companyRoleChecker } from '../middlewares/companyRoleChecker';
import { ROLE_COMPANY } from '../middlewares/roles';
import { userOwnChecker } from '../middlewares/userOwnChecker';

export const register = (router: Router) => {
  const jobOpeningGetController: JobOpeningGetController = container.get(
    'App.controllers.jobOpenings.JobOpeningGetController'
  );
  router.get('/job_openings/:id', authChecker,
    (req: Request, res: Response) =>
    jobOpeningGetController.run(req, res)
  );

  const jobOpeningFetchController: JobOpeningFetchController = container.get(
    'App.controllers.jobOpenings.JobOpeningFetchController'
  );
  router.get('/job_openings', authChecker,
    (req: Request, res: Response) =>
    jobOpeningFetchController.run(req, res)
  );

  const jobOpeningPostController: JobOpeningPostController = container.get(
    'App.controllers.jobOpenings.JobOpeningPostController'
  );
  router.post('/job_openings', authChecker,
    companyRoleChecker, (req: Request, res: Response) =>
    jobOpeningPostController.run(req, res)
  );

  const jobOpeningPutController: JobOpeningPutController = container.get(
    'App.controllers.jobOpenings.JobOpeningPutController'
  );
  router.put('/job_openings/:id', authChecker,
    companyRoleChecker,(req: Request, res: Response) =>
    jobOpeningPutController.run(req, res)
  );

  const jobOpeningDeleteController: JobOpeningDeleteController = container.get(
    'App.controllers.jobOpenings.JobOpeningDeleteController'
  );
  router.delete('/job_openings/:id', authChecker,
    companyRoleChecker, (req: Request, res: Response) =>
    jobOpeningDeleteController.run(req, res)
  );
};
