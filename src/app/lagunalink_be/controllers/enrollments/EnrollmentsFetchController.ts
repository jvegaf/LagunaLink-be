import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { Enrollment } from '../../../../Contexts/LLBE/Enrollments/domain/Enrollment';
import { EnrollmentsFetcher } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsFetcher';

export class EnrollmentsFetchController implements Controller {
  private fetcher: EnrollmentsFetcher;

  constructor(fetcher: EnrollmentsFetcher) {
    this.fetcher = fetcher;
  }

  async run(req: Request, res: Response) {

    const enrollments: Array<Enrollment> = await this.fetcher.run(req.params.id);
    if (enrollments.length < 1) {
      res.status(204).send();
      return;
    }
    const resultMap = enrollments.map(enrollment => enrollment.toPrimitives());

    res.status(200).send({ enrollments: resultMap });
  }
}
