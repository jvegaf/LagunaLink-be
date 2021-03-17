import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { JobOpeningRemover } from '../../../../Contexts/LLBE/JobOpenings/application/Remove/JobOpeningRemover';
import { RemoveJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/Remove/RemoveJobOpeningRequest';

export class JobOpeningDeleteController implements Controller {
  private remover: JobOpeningRemover;

  constructor(jobOpenRemover: JobOpeningRemover) {
    this.remover = jobOpenRemover;
  }

  async run(req: Request, res: Response) {
    const jobOpenRemRequest: RemoveJobOpeningRequest = {
      id: req.params.id,
      company: req.body.payload.userId
    };

    try {
      await this.remover.run(jobOpenRemRequest);
    } catch (e) {
      res.status(404).send({error: e.message});
      return;
    }

    res.status(200).send();
  }
}
