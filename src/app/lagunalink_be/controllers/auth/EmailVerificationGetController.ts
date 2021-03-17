import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserEmailConfirmator } from '../../../../Contexts/LLBE/Users/application/UserEmailConfirmator';

export class EmailVerificationGetController implements Controller {
  private confirmator: UserEmailConfirmator;

  constructor(confirmator: UserEmailConfirmator) {
    this.confirmator = confirmator;
  }

  async run(req: Request, res: Response) {

    try {
      await this.confirmator.run(req.body.payload.userId);
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send({error: e.message});
    }

    const frontUri: string = process.env.FRONTEND_URL!;
    const confirmedUri = `http://${frontUri}/auth/confirmed`;
    res.redirect(301, confirmedUri);
  }
}
