import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/StudentCreator';
import httpStatus from 'http-status';
import { Controller } from '../Controller';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) { }

  async run(req: Request, res: Response) {

   
    const name: string = req.body.name;
    const surname: string = req.body.surname;
    const lastname: string = req.body.lastname;

    try {
      await this.studentCreator.run({ name, surname, lastname });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }

    res.status(httpStatus.CREATED).send();
  }
}
