import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { CompanyFinder } from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';
import { CompanyId } from '../../../../Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyJobsFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';

export class CompanyGetController implements Controller {
  private finder: CompanyFinder;
  private jobsFetcher: CompanyJobsFetcher;

  constructor(companyFinder: CompanyFinder, jobsFetcher: CompanyJobsFetcher) {
    this.finder = companyFinder;
    this.jobsFetcher = jobsFetcher;
  }

  async run(req: Request, res: Response) {

    try {
      const company = await this.finder.run(new CompanyId(req.params.id));
      const companyPrimitives = company.toPrimitives();
      const jobOpenings = await this.jobsFetcher.run(company.id);
      const jobs = jobOpenings.map(job => job.toPrimitives())
      res.status(200).send({company: {...companyPrimitives, job_openings: jobs}});
    } catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
