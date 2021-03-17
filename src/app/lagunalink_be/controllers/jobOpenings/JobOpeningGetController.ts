import { Controller } from '../Controller';
import { JobOpeningFinder } from '../../../../Contexts/LLBE/JobOpenings/application/Find/JobOpeningFinder';
import { Request, Response } from 'express';
import { JobOpeningId } from '../../../../Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';

export class JobOpeningGetController implements Controller {
  private finder: JobOpeningFinder;

  constructor(jobOpeningFinder: JobOpeningFinder) {
    this.finder = jobOpeningFinder;
  }

  async run(req: Request, res: Response) {
    try {
      const jobOpening = await this.finder.run(new JobOpeningId(req.params.id));

      res.status(200).send({jobOpening: jobOpening.toPrimitives()});
    } catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
