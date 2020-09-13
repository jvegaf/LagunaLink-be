import { Request, Response } from 'express';
import { StudentCreator } from '../../../Contexts/LLBE/Students/application/StudentCreator';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { CreateStudentRequest } from '../../../../Contexts/LLBE/Students/application/CreateStudentRequest';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) { }

  async run(req: Request, res: Response) {

    const createStudentReq: CreateStudentRequest = {};
    createStudentReq.name = req.body.name;
    createStudentReq.surname = req.body.surname;
    createStudentReq.lastname = req.body.lastname;

    try {
      await this.studentCreator.run({ createStudentReq });
    } catch (error) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }

    res.status(httpStatus.CREATED).send();
  }
}
