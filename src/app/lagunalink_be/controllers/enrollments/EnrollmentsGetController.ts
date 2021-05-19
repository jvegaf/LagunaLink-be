import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { EnrollmentsSearcher } from '../../../../Contexts/LLBE/Enrollments/application/EnrollmentsSearcher';

export class EnrollmentsGetController implements Controller {
  private searcher: EnrollmentsSearcher;

  constructor(
    searcher: EnrollmentsSearcher
  ) {
    this.searcher = searcher;
  }

  async run(req: Request, res: Response) {

    const enrolls = await this.searcher.run(req.params.id);

    res.status(200).send({ enrollments: enrolls });
  }
}
