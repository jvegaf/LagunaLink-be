import {Request, Response} from 'express';
import {Controller} from '../Controller';
import {EnrollmentRemover} from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentRemover';
import {RemoveEnrollmentRequest} from '../../../../Contexts/LLBE/Enrollments/application/RemoveEnrollmentRequest';
import {EnrollmentsFetcher} from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsFetcher';

export class EnrollmentDeleteController implements Controller {
  private remover: EnrollmentRemover;
  private fetcher: EnrollmentsFetcher;

  constructor(enrollmentRemover: EnrollmentRemover, fetcher: EnrollmentsFetcher) {
    this.remover = enrollmentRemover;
    this.fetcher = fetcher;
  }

  async run(req: Request, res: Response) {

    const request: RemoveEnrollmentRequest = {
      enrollment_id: req.params.id,
      student: req.body.payload.userId,
    };

    try {
      await this.remover.run(request);
      const enrollments = await this.fetcher.run(req.body.payload.userId);
      const enrolls = enrollments.map(enrollment => enrollment.toPrimitives());
      res.status(200).send({enrollments: enrolls});
    } catch (e) {
      res.status(404).send({error: e.message});
    }
  }
}
