import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { EnrollmentRemover } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentRemover';
import { RemoveEnrollmentRequest } from '../../../../Contexts/LLBE/Enrollments/application/RemoveEnrollmentRequest';

export class EnrollmentDeleteController implements Controller {
  private remover: EnrollmentRemover;

  constructor(enrollmentRemover: EnrollmentRemover) {
    this.remover = enrollmentRemover;
  }

  async run(req: Request, res: Response) {

    const request: RemoveEnrollmentRequest = {
      enrollment_id: req.params.id,
      student: req.body.payload.userId,
    };

    try {
      await this.remover.run(request);
    } catch (e) {
      res.status(404).send({ error: e.message });
      return;
    }

    res.status(200).send();
  }
}
