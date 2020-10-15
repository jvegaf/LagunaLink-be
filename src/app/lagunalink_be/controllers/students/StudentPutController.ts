import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { StudentUpgrader } from '../../../../Contexts/LLBE/Students/application/StudentUpgrader';
import { UpgradeStudentRequest } from '../../../../Contexts/LLBE/Students/application/UpgradeStudentRequest';

// noinspection SpellCheckingInspection
export class StudentPutController implements Controller {
  private upgrader: StudentUpgrader;
  private authRoleChecker: AuthRole;

  constructor(studentUpgrader: StudentUpgrader, authRole: AuthRole) {
    this.upgrader = studentUpgrader;
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

    //TODO: validacion del request Body ????
    const studentRequest: UpgradeStudentRequest = req.body;

    await this.upgrader.run(studentRequest);

    res.status(200).send();
  }
}
