import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import { CompanyFinder } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';

// noinspection SpellCheckingInspection
export class CompanyGetController implements Controller {
  private finder: CompanyFinder;
  private authChecker: AuthChecker;

  constructor(companyFinder: CompanyFinder, authChecker: AuthChecker) {
    this.authChecker = authChecker;
    this.finder = companyFinder;
  }

  async run(req: Request, res: Response) {

    if (req.headers.authorization === null) {
      res.status(httpStatus.PAYMENT_REQUIRED).send();
    }
    const token = new Token(req.headers.authorization as string);
    try {
      this.authChecker.check(token);
    }
    catch (e) {
      res.status(402).send({message: e.message});
    }

    try {
      const company = await this.finder.run(new CompanyId(req.params.id));

      res.status(200).send({company: company.toPrimitives()});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
