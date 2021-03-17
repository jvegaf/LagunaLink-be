import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyFinder } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';

export class CompanyGetController implements Controller {
  private finder: CompanyFinder;

  constructor(companyFinder: CompanyFinder) {
    this.finder = companyFinder;
  }

  async run(req: Request, res: Response) {

    try {
      const company = await this.finder.run(new CompanyId(req.params.id));

      res.status(200).send({company: company.toPrimitives()});
    } catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
