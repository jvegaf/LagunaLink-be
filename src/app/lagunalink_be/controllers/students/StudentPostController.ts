import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/StudentCreator';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) {
  }

  async run(req: Request, res: Response) {

    const id: string = req.body.id;
    const name: string = req.body.name;
    const surname: string = req.body.surname;
    const lastname: string = req.body.lastname;

    await this.studentCreator.run({id, name, surname, lastname});

    res.status(httpStatus.CREATED).send();
  }
}
