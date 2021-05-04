import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { EnrollmentCreator } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentCreator';
import { CreateEnrollmentRequest } from '../../../../Contexts/LLBE/Enrollments/application/CreateEnrollmentRequest';
import {EnrollmentsFetcher} from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsFetcher';

export class EnrollmentPostController implements Controller {
  private creator: EnrollmentCreator;
  private fetcher: EnrollmentsFetcher;

  constructor(enrollCreator: EnrollmentCreator, fetcher: EnrollmentsFetcher) {
    this.fetcher = fetcher;
    this.creator = enrollCreator;
  }

  async run(req: Request, res: Response) {

    const request: CreateEnrollmentRequest = {
      student: req.body.payload.userId,
      job_opening: req.params.id,
    };

    await this.creator.run(request);
    const enrolls = await this.fetcher.run(req.body.payload.userId);

    res.status(201).send({ enrollments: enrolls});
  }
}
