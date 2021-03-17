import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { StudentFinder } from '../../../../Contexts/LLBE/Students/application/Find/StudentFinder';
import { StudentId } from '../../../../Contexts/LLBE/Shared/domain/Students/StudentId';

export class StudentGetController implements Controller {
  private finder: StudentFinder;

  constructor(studentFinder: StudentFinder) {
    this.finder = studentFinder;
  }

  async run(req: Request, res: Response) {

    try {
      const student = await this.finder.run(new StudentId(req.params.id));

      res.status(200).send({student: student.toPrimitives()});
    } catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
