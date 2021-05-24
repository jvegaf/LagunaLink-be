import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { CompanyPutController } from '../controllers/companies/CompanyPutController';
import { CompanyGetController } from '../controllers/companies/CompanyGetController';
import { CompanyJobsGetController } from '../controllers/companies/CompanyJobsGetController';
import { authChecker } from '../middlewares/authChecker';
import { userOwnChecker } from '../middlewares/userOwnChecker';
import { CompanyFetchController } from '../controllers/companies/CompanyFetchController';

export const register = (router: Router) => {
  const companyGetController: CompanyGetController = container.get('App.controllers.companies.CompanyGetController');
  router.get('/companies/:id', authChecker, (req: Request, res: Response) => companyGetController.run(req, res));

  const companyFetchController: CompanyFetchController = container.get(
    'App.controllers.companies.CompanyFetchController'
  );
  router.get('/companies', authChecker, (req: Request, res: Response) => companyFetchController.run(req, res));

  const companyJobsGetController: CompanyJobsGetController = container.get(
    'App.controllers.companies.CompanyJobsGetController'
  );
  router.get('/companies/:id/job_openings', authChecker, (req: Request, res: Response) =>
    companyJobsGetController.run(req, res)
  );

  const companyPutController: CompanyPutController = container.get('App.controllers.companies.CompanyPutController');
  router.put('/companies/:id', authChecker, userOwnChecker, (req: Request, res: Response) =>
    companyPutController.run(req, res)
  );
};
