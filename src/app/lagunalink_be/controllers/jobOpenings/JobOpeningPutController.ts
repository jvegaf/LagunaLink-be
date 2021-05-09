import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { JobOpeningUpgrader } from '../../../../Contexts/LLBE/JobOpenings/application/Update/JobOpeningUpgrader';
import { UpgradeJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/Update/UpgradeJobOpeningRequest';
import { CompanyJobsFetcher } from '../../../../Contexts/LLBE/JobOpenings/application/Fetch/CompanyJobsFetcher';

export class JobOpeningPutController implements Controller {
  private upgrader: JobOpeningUpgrader;
  private companyJobsFetcher: CompanyJobsFetcher;

  constructor(jobOpeningUpgrader: JobOpeningUpgrader, companyJobsFetcher: CompanyJobsFetcher) {
    this.upgrader = jobOpeningUpgrader;
    this.companyJobsFetcher = companyJobsFetcher;
  }

  async run(req: Request, res: Response) {
    const jobOpenUprgRequest: UpgradeJobOpeningRequest = {
      id: req.params.id,
      company: req.body.payload.userId,
      description: req.body.description,
      position: req.body.position,
      conditions: req.body.conditions,
      responsibilities: req.body.responsibilities,
      qualification: req.body.qualification,
      prevExperience: req.body.prevExperience,
      hiringDate: req.body.hiringDate,
    };

    try {
      await this.upgrader.run(jobOpenUprgRequest);
      const ownJobs = await this.companyJobsFetcher.run(req.body.payload.userId);
      const jobs = ownJobs.map(j => j.toPrimitives());
      res.status(200).send({ job_openings: jobs });
    } catch (e) {
      res.status(404).send({ error: e.message });
    }
  }
}
