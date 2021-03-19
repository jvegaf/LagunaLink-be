import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { StudentUpgrader } from '../../../../Contexts/LLBE/Students/application/Update/StudentUpgrader';
import { UpgradeStudentRequest } from '../../../../Contexts/LLBE/Students/application/Update/UpgradeStudentRequest';

export class StudentPutController implements Controller {
  private upgrader: StudentUpgrader;

  constructor(studentUpgrader: StudentUpgrader) {
    this.upgrader = studentUpgrader;
  }

  async run(req: Request, res: Response) {

    const studentRequest: UpgradeStudentRequest = {
      ...req.body,
      id: req.params.id,
    };
    const studentUpdated = await this.upgrader.run(studentRequest);

    res.status(200).send({student: studentUpdated});
  }
}
