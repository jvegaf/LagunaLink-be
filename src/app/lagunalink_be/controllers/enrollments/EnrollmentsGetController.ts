import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { EnrollmentsSearcher } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsSearcher';
import { StudentFinder } from '../../../../Contexts/LLBE/Students/application/Find/StudentFinder';
import { StudentId } from '../../../../Contexts/LLBE/Shared/domain/Students/StudentId';
import { UserEmailFinder } from '../../../../Contexts/LLBE/Users/application/UserEmailFinder';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';

export class EnrollmentsGetController implements Controller {
  private searcher: EnrollmentsSearcher;
  private authRoleChecker: AuthRole;
  private studentFinder: StudentFinder;
  private userEmailFinder: UserEmailFinder;

  constructor(
    searcher: EnrollmentsSearcher,
    authRole: AuthRole,
    studentFinder: StudentFinder,
    userEmailFinder: UserEmailFinder
  ) {
    this.searcher = searcher;
    this.authRoleChecker = authRole;
    this.studentFinder = studentFinder;
    this.userEmailFinder = userEmailFinder;
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

    const enrollments = await this.searcher.run(req.params.id);
    if (enrollments.length < 1) {
      res.status(204).send();
      return;
    }
    const resultMap = enrollments.map((enrollment) =>
      enrollment.toPrimitives()
    );

    const result = resultMap.map(async (enrollment) => {
      const student = await this.studentFinder.run(
        new StudentId(enrollment.student)
      );
      enrollment.student = student.toPrimitives();
      const email = await this.userEmailFinder.run(
        new UserId(enrollment.student.id)
      );
      enrollment.student.email = email.value;
    });

    res.status(200).send({ enrollments: result });
  }
}
