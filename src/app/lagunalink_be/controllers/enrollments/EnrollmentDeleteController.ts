import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { EnrollmentRemover } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentRemover';
import { RemoveEnrollmentRequest } from '../../../../Contexts/LLBE/Enrollments/application/RemoveEnrollmentRequest';

// noinspection SpellCheckingInspection
export class EnrollmentDeleteController implements Controller {
  private remover: EnrollmentRemover;
  private authRoleChecker: AuthRole;

  constructor(enrollmentRemover: EnrollmentRemover, authRole: AuthRole) {
    this.remover = enrollmentRemover;
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
      return;
    }

    const request: RemoveEnrollmentRequest = {
      enrollment_id: req.params.id,
      student: payload.userId,
    };

    try {
      await this.remover.run(request);
    } catch (e) {
      res.status(404).send({ error: e.message });
      return;
    }

    res.status(200).send();
  }
}
