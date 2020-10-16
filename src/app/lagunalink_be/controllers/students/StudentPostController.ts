import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/StudentCreator';
import { Controller } from '../Controller';
import { CreateStudentRequest } from '../../../../Contexts/LLBE/Students/application/CreateStudentRequest';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';

export class StudentPostController implements Controller {
  private studentCreator: StudentCreator;
  private authRoleCheker: AuthRole;

  constructor(studentCreator: StudentCreator, authRole: AuthRole) {
    this.studentCreator = studentCreator;
    this.authRoleCheker = authRole;
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
      this.authRoleCheker.check(payload);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }

    const studentRequest: CreateStudentRequest = {
      id: payload.userId,
      name: req.body.name,
      surname: req.body.surname,
      lastname: req.body.lastname,
    };

    try {
      await this.studentCreator.run(studentRequest);
    } catch (err) {
      res.status(400).send({ error: 'the student account exists' });
    }

    res.status(201).send();
  }
}
