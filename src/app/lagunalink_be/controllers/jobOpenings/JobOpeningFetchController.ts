import { Controller } from '../Controller';
import { Request, Response } from 'express';
import { JobOpeningFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/JobOpeningFetcher';

export class JobOpeningFetchController implements Controller {
  private fetcher: JobOpeningFetcher;

  constructor(jobOpeningFetcher: JobOpeningFetcher) {
    this.fetcher = jobOpeningFetcher;
  }

  async run(req: Request, res: Response) {
    const jobs = await this.fetcher.run();

    res.status(200).send({jobOpenings: jobs});
  }
}
