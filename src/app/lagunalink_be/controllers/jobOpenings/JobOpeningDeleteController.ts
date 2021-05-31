import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { JobOpeningDeactivator } from '../../../../Contexts/LLBE/JobOpenings/application/Update/JobOpeningDeactivator';

export class JobOpeningDeleteController implements Controller {
  private deactivator: JobOpeningDeactivator;

  constructor(deactivator: JobOpeningDeactivator) {
    this.deactivator = deactivator;
  }

  async run(req: Request, res: Response) {
    try {
      await this.deactivator.run(req.params.id, req.body.payload.userId);
      res.status(200).send();
    } catch (e) {
      res.status(404).send({ error: e.message });
    }
  }
}
