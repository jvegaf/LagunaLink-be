import { Request, Response, Router } from 'express';
import container from '../config/dependency-injection';
import { CompanyPostController } from '../controllers/companies/CompanyPostController';
import { CompanyPutController } from '../controllers/companies/CompanyPutController';

export const register = (router: Router) => {
  const companyPostController: CompanyPostController = container.get(
    'App.controllers.companies.CompanyPostController'
  );
  router.post('/companies', (req: Request, res: Response) =>
    companyPostController.run(req, res)
  );

  const companyPutController: CompanyPutController = container.get(
    'App.controllers.companies.CompanyPutController'
  );
  router.put('/companies', (req: Request, res: Response) =>
    companyPutController.run(req, res)
  );
};
