import { Request, Response } from 'express';
import { CourseCreator as StudentCreator } from '../../../Contexts/LLBE/Courses/application/CourseCreator';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { CourseAlreadyExists } from '../../../Contexts/LLBE/Courses/domain/CourseAlreadyExists';

export class StudentPostController implements Controller {
  constructor(private studentCreator: StudentCreator) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;

    try {
      await this.studentCreator.run({ id, name, duration });
    } catch (error) {
      if (error instanceof CourseAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.CREATED).send();
  }
}
