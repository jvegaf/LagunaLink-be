import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { JobOpeningUpgrader } from '../../../../Contexts/LLBE/JobOpenings/application/JobOpeningUpgrader';
import { UpgradeJobOpeningRequest } from '../../../../Contexts/LLBE/JobOpenings/application/UpgradeJobOpeningRequest';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';

// noinspection SpellCheckingInspection
export class JobOpeningPutController implements Controller {
  private upgrader: JobOpeningUpgrader;
  private authChecker: AuthChecker;
  private authRoleChecker: AuthRole;

  constructor(jobOpeningUpgrader: JobOpeningUpgrader, authChecker: AuthChecker, authRole: AuthRole) {
    this.authChecker = authChecker;
    this.upgrader = jobOpeningUpgrader;
    this.authRoleChecker = authRole;
  }

  async run(req: Request, res: Response) {
    if (req.headers.authorization === null) {
      res.status(httpStatus.PAYMENT_REQUIRED).send();
      return;
    }
    const token = new Token(req.headers.authorization as string);
    let payload: Payload;
    try {
      payload = this.authChecker.check(token);
    } catch (e) {
      res.status(402).send({ message: e.message });
      return;
    }

    try {
      this.authRoleChecker.check(payload);
    } catch (e) {
      res.status(400).send({ error: e.message });
      return;
    }

    const jobOpenUprgRequest: UpgradeJobOpeningRequest = {
      id: req.params.id,
      company: payload.userId,
      title: req.body.title,
      position: req.body.position,
      conditions: req.body.conditions,
      responsibilities: req.body.responsibilities,
      qualification: req.body.qualification,
      prevExperience: req.body.prevExperience,
    };

    try {
      await this.upgrader.run(jobOpenUprgRequest);
    } catch (e) {
      res.status(404).send({ error: e.message });
      return;
    }

    res.status(200).send();
  }
}
