import { Controller } from '../Controller';
import { JobOpeningFinder } from '../../../../Contexts/LLBE/JobOpenings/application/Find/JobOpeningFinder';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import httpStatus from 'http-status';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import { Request, Response } from 'express';
import { JobOpeningId } from '../../../../Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';

export class JobOpeningGetController implements Controller {
  private finder: JobOpeningFinder;
  private authChecker: AuthChecker;

  constructor(jobOpeningFinder: JobOpeningFinder, authChecker: AuthChecker) {
    this.authChecker = authChecker;
    this.finder = jobOpeningFinder;
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
      const jobOpening = await this.finder.run(new JobOpeningId(req.params.id));

      res.status(200).send({jobOpening: jobOpening.toPrimitives()});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
