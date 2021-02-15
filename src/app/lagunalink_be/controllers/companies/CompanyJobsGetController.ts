import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyJobsFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';

export class CompanyJobsGetController implements Controller {
  private jobsFetcher: CompanyJobsFetcher;
  private authChecker: AuthChecker;

  constructor(jobsFetcher: CompanyJobsFetcher, authChecker: AuthChecker) {
    this.authChecker = authChecker;
    this.jobsFetcher = jobsFetcher;
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
      const jobOpenings = await this.jobsFetcher.run(new CompanyId(req.params.id));
      res.status(200).send({jobOpenings: jobOpenings});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
