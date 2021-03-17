import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { EnrollmentCreator } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentCreator';
import { CreateEnrollmentRequest } from '../../../../Contexts/LLBE/Enrollments/application/CreateEnrollmentRequest';

export class EnrollmentPostController implements Controller {
  private creator: EnrollmentCreator;

  constructor(enrollCreator: EnrollmentCreator) {
    this.creator = enrollCreator;
  }

  async run(req: Request, res: Response) {

    const request: CreateEnrollmentRequest = {
      student: req.body.payload.userId,
      job_opening: req.params.id,
    };

    await this.creator.run(request);

    res.status(201).send();
  }
}
