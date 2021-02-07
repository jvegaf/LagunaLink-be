import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { StudentUpgrader } from '../../../../Contexts/LLBE/Students/application/Update/StudentUpgrader';
import { UpgradeStudentRequest } from '../../../../Contexts/LLBE/Students/application/Update/UpgradeStudentRequest';
import { CompanyUpgrader } from '../../../../Contexts/LLBE/Companies/application/CompanyUpgrader';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';

// noinspection SpellCheckingInspection
export class StudentPutController implements Controller {
  private upgrader: StudentUpgrader;
  private authChecker: AuthChecker;
  private authRoleChecker: AuthRole;

  constructor(studentUpgrader: StudentUpgrader, authChecker: AuthChecker, authRole: AuthRole) {
    this.authChecker = authChecker;
    this.upgrader = studentUpgrader;
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

    const studentRequest: UpgradeStudentRequest = {
      ...req.body,
      id: payload.userId,
    };
    await this.upgrader.run(studentRequest);

    res.status(200).send();
  }
}
