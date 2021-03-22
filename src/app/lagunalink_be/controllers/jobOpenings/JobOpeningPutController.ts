import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { JobOpeningUpgrader } from '../../../../Contexts/LLBE/JobOpenings/application/Update/JobOpeningUpgrader';
import { UpgradeJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/Update/UpgradeJobOpeningRequest';

export class JobOpeningPutController implements Controller {
  private upgrader: JobOpeningUpgrader;

  constructor(jobOpeningUpgrader: JobOpeningUpgrader) {
    this.upgrader = jobOpeningUpgrader;
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
    };

    try {
      await this.upgrader.run(jobOpenUprgRequest);
    } catch (e) {
      res.status(404).send({error: e.message});
      return;
    }

    res.status(200).send();
  }
}
