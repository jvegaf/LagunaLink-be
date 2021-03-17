import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/Create/StudentCreator';
import { Controller } from '../Controller';
import { CreateStudentRequest } from '../../../../Contexts/LLBE/Students/application/Create/CreateStudentRequest';

export class StudentPostController implements Controller {
  private studentCreator: StudentCreator;

  constructor(studentCreator: StudentCreator) {
    this.studentCreator = studentCreator;
  }

  async run(req: Request, res: Response) {

    const studentRequest: CreateStudentRequest = {
      id: req.body.payload.userId,
      name: req.body.name,
      surname: req.body.surname,
      lastname: req.body.lastname,
    };

    try {
      await this.studentCreator.run(studentRequest);
    } catch (err) {
      console.log(err.message);
      res.status(400).send({error: 'the student account exists'});
    }

    res.status(201).send();
  }
}
