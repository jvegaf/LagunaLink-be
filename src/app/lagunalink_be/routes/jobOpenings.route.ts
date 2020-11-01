import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { JobOpeningPostController } from '../controllers/jobOpenings/JobOpeningPostController';
import { JobOpeningPutController } from '../controllers/jobOpenings/JobOpeningPutController';
import { JobOpeningDeleteController } from '../controllers/jobOpenings/JobOpeningDeleteController';

export const register = (router: Router) => {
  const jobOpeningPostController: JobOpeningPostController = container.get(
    'App.controllers.jobOpenings.JobOpeningPostController'
  );
  router.post('/job_openings', (req: Request, res: Response) =>
    jobOpeningPostController.run(req, res)
  );

  const jobOpeningPutController: JobOpeningPutController = container.get(
    'App.controllers.jobOpenings.JobOpeningPutController'
  );
  router.put('/job_openings/:id', (req: Request, res: Response) =>
    jobOpeningPutController.run(req, res)
  );

  const jobOpeningDeleteController: JobOpeningDeleteController = container.get(
    'App.controllers.jobOpenings.JobOpeningDeleteController'
  );
  router.delete('/job_openings/:id', (req: Request, res: Response) =>
    jobOpeningDeleteController.run(req, res)
  );
};
