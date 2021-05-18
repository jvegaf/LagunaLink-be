import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyFinder } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyFinderRequest } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinderRequest';

export class CompanyGetController implements Controller {
  private finder: CompanyFinder;

  constructor(companyFinder: CompanyFinder) {
    this.finder = companyFinder;
  }

  async run(req: Request, res: Response) {

    const finderReq: CompanyFinderRequest = {
      companyId: req.params.id,
      accountOwner: req.params.id === req.body.payload.userId
    };

    try {
      const _company = await this.finder.run(finderReq);

      res.status(200).send({company: _company});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
