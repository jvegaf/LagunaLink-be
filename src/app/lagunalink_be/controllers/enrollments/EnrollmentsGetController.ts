import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { EnrollmentsSearcher } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsSearcher';
import { StudentFinder } from '../../../../Contexts/LLBE/Students/application/Find/StudentFinder';
import { StudentId } from '../../../../Contexts/LLBE/Shared/domain/Students/StudentId';
import { UserEmailFinder } from '../../../../Contexts/LLBE/Users/application/UserEmailFinder';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';

export class EnrollmentsGetController implements Controller {
  private searcher: EnrollmentsSearcher;
  private studentFinder: StudentFinder;
  private userEmailFinder: UserEmailFinder;

  constructor(
    searcher: EnrollmentsSearcher,
    studentFinder: StudentFinder,
    userEmailFinder: UserEmailFinder
  ) {
    this.searcher = searcher;
    this.studentFinder = studentFinder;
    this.userEmailFinder = userEmailFinder;
  }

  async run(req: Request, res: Response) {

    const enrollments = await this.searcher.run(req.params.id);
    if (enrollments.length < 1) {
      res.status(204).send();
      return;
    }
    const resultMap = enrollments.map((enrollment) => {
      return enrollment.toPrimitives();
    }
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
