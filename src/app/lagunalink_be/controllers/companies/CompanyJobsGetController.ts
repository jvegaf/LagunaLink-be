import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyJobsFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';

export class CompanyJobsGetController implements Controller {
  private jobsFetcher: CompanyJobsFetcher;

  constructor(jobsFetcher: CompanyJobsFetcher) {
    this.jobsFetcher = jobsFetcher;
  }

  async run(req: Request, res: Response) {
    try {
      const jobOpenings = await this.jobsFetcher.run(new CompanyId(req.params.id));
      res.status(200).send({jobOpenings: jobOpenings});
    } catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
