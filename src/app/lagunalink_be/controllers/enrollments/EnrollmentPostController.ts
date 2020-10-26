import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { EnrollmentCreator } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentCreator';
import { CreateEnrollmentRequest } from '../../../../Contexts/LLBE/Enrollments/application/CreateEnrollmentRequest';

export class EnrollmentPostController implements Controller {
  private creator: EnrollmentCreator;
  private authRoleChecker: AuthRole;

  constructor(enrollCreator: EnrollmentCreator, authRole: AuthRole) {
    this.creator = enrollCreator;
    this.authRoleChecker = authRole;
  }

  async run(req: Request, res: Response) {
    if (req.headers.authorization === null) {
      res.status(httpStatus.PAYMENT_REQUIRED).send();
      return;
    }
    const token = new Token(req.headers.authorization as string);
    const authChecker = new AuthJWTChecker();
    let payload: Payload;
    try {
      payload = authChecker.check(token);
    } catch (e) {
      res.status(402).send({ message: e.message });
      return;
    }

    try {
      this.authRoleChecker.check(payload);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }

    const request: CreateEnrollmentRequest = {
      student: payload.userId,
      job_opening: req.params.id,
    };

    await this.creator.run(request);

    res.status(201).send();
  }
}
