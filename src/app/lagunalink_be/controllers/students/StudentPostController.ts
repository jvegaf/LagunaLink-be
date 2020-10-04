import { Request, Response } from 'express';
import { StudentCreator } from '../../../../Contexts/LLBE/Students/application/StudentCreator';
import { Controller } from '../Controller';
import { CreateStudentRequest } from '../../../../Contexts/LLBE/Students/application/CreateStudentRequest';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) {}

  async run(req: Request, res: Response) {
    console.log('dentro del controller id: ' + req.body.jwtPayload.userId);
    const studentRequest: CreateStudentRequest = {
      id: req.body.jwtPayload.userId,
      name: req.body.name,
      surname: req.body.surname,
      lastname: req.body.lastname,
    };

    await this.studentCreator.run(studentRequest);

    res.status(201).send();
  }
}
