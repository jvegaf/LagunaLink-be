import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import {JobOpeningRemover} from '../../../../Contexts/LLBE/JobOpenings/application/JobOpeningRemover';
import {RemoveJobOpeningRequest} from '../../../../Contexts/LLBE/JobOpenings/application/RemoveJobOpeningRequest';

// noinspection SpellCheckingInspection
export class JobOpeningDeleteController implements Controller {
  private remover: JobOpeningRemover;
  private authChecker: AuthChecker;
  private authRoleChecker: AuthRole;

  constructor(jobOpenRemover: JobOpeningRemover, authChecker: AuthChecker, authRole: AuthRole) {
    this.authChecker = authChecker;
    this.remover = jobOpenRemover;
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

    const jobOpenRemRequest: RemoveJobOpeningRequest = {
      id: req.params.id,
      company: payload.userId
    };

    try {
      await this.remover.run(jobOpenRemRequest);
    } catch (e) {
      res.status(404).send({ error: e.message });
      return;
    }

    res.status(200).send();
  }
}
