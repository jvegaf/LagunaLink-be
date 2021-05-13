import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyFinder } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyJobsFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';
import { EnrollmentsCounter } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsCounter';

export class CompanyGetController implements Controller {
  private finder: CompanyFinder;
  private jobsFetcher: CompanyJobsFetcher;
  private enrollsCounter: EnrollmentsCounter;

  constructor(companyFinder: CompanyFinder, jobsFetcher: CompanyJobsFetcher, enrollsCounter: EnrollmentsCounter) {
    this.finder = companyFinder;
    this.jobsFetcher = jobsFetcher;
    this.enrollsCounter = enrollsCounter;
  }

  async run(req: Request, res: Response) {

    try {
      const company = await this.finder.run(new CompanyId(req.params.id));
      const companyPrimitives = company.toPrimitives();
      const jobOpenings = await this.jobsFetcher.run(company.id);
      const jobsPrimitives = jobOpenings.map(job => job.toPrimitives());
      const jobs = await Promise.all(jobsPrimitives.map(async job => {
        job.enrollsCount = await this.enrollsCounter.run(job.id);
        return job;
      }));

      res.status(200).send({company: {...companyPrimitives, job_openings: jobs}});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
