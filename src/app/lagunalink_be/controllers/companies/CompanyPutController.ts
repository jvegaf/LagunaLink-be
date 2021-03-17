import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyUpgrader } from '../../../../Contexts/LLBE/Companies/application/Update/CompanyUpgrader';
import { CompanyRequest } from '../../../../Contexts/LLBE/Companies/application/CompanyRequest';

export class CompanyPutController implements Controller {
  private upgrader: CompanyUpgrader;

  constructor(companyUpgrader: CompanyUpgrader) {
    this.upgrader = companyUpgrader;
  }

  async run(req: Request, res: Response) {

    const companyRequest: CompanyRequest = {...req.body, id: req.body.payload.userId};

    await this.upgrader.run(companyRequest);

    res.status(200).send();
  }
}
