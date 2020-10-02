import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserEmailConfirmator } from '../../../../Contexts/LLBE/Users/application/UserEmailConfirmator';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';

export class EmailVerificationGetController implements Controller {
  constructor(private confirmator: UserEmailConfirmator) {}

  async run(req: Request, res: Response) {
    const userId = new UserId(req.body.userId);

    try {
      await this.confirmator.run(userId);
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send({ error: e.message });
    }

    res.status(httpStatus.OK).send({ message: 'Account confirmed' });
  }
}
