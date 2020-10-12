import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/StudentCreator';
import { Controller } from '../Controller';
import { CreateStudentRequest } from '../../../../Contexts/LLBE/Students/application/CreateStudentRequest';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { UserRole } from '../../../../Contexts/LLBE/Users/domain/UserRole';
import { AuthRoleChecker } from '../../../../Contexts/LLBE/Users/application/AuthRoleChecker';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) {}

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

    const roles = [new UserRole('ROLE_STUDENT')];
    const requestRole = new UserRole(payload.role);
    const roleChecker = new AuthRoleChecker(roles);
    try {
      roleChecker.run(requestRole);
    } catch (e) {
      res.status(402).send({ message: e.message });
    }

    const studentRequest: CreateStudentRequest = {
      id: payload.userId,
      name: req.body.name,
      surname: req.body.surname,
      lastname: req.body.lastname,
    };

    await this.studentCreator.run(studentRequest);

    res.status(201).send();
  }
}
