import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { JobOpeningCreator } from '../../../../Contexts/LLBE/JobOpenings/application/Create/JobOpeningCreator';
import { CreateJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/Create/CreateJobOpeningRequest';

export class JobOpeningPostController implements Controller {
  private creator: JobOpeningCreator;

  constructor(jobOpenCreator: JobOpeningCreator) {
    this.creator = jobOpenCreator;
  }

  async run(req: Request, res: Response) {

    const jobOpenRequest: CreateJobOpeningRequest = {
      company: req.body.payload.userId,
      description: req.body.description,
      position: req.body.position,
      conditions: req.body.conditions,
      responsibilities: req.body.responsibilities,
      qualification: req.body.qualification,
      prevExperience: req.body.prevExperience,
      hiringDate: req.body.hiringDate
    };

    const jobOpening = await this.creator.run(jobOpenRequest);
    const jobOpPrimitives = jobOpening.toPrimitives();
    res.status(201).send({ job_opening: jobOpPrimitives });
  }
}
