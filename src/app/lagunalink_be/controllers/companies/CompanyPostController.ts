import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyCreator } from '../../../../Contexts/LLBE/Companies/application/Create/CompanyCreator';
import { CompanyRequest } from '../../../../Contexts/LLBE/Companies/application/CompanyRequest';

export class CompanyPostController implements Controller {
  private creator: CompanyCreator;

  constructor(companyCreator: CompanyCreator) {
    this.creator = companyCreator;
  }

  async run(req: Request, res: Response) {

    const companyRequest: CompanyRequest = {
      id: req.body.payload.userId,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      postalCode: req.body.postalCode,
      region: req.body.region,
      city: req.body.city,
    };

    try {
      await this.creator.run(companyRequest);
    } catch (err) {
      res.status(400).send({error: 'the company account exists'});
    }

    res.status(201).send();
  }
}
