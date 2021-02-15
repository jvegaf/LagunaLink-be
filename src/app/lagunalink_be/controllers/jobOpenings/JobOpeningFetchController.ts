import { Controller } from '../Controller';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import httpStatus from 'http-status';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import { Request, Response } from 'express';
import { JobOpeningFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/JobOpeningFetcher';

export class JobOpeningFetchController implements Controller {
  private fetcher: JobOpeningFetcher;
  private authChecker: AuthChecker;

  constructor(jobOpeningFetcher: JobOpeningFetcher, authChecker: AuthChecker) {
    this.authChecker = authChecker;
    this.fetcher = jobOpeningFetcher;
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

    const jobs = await this.fetcher.run();

    res.status(200).send({jobOpenings: jobs});

  }
}
