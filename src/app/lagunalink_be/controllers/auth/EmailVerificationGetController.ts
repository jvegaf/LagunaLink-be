import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserEmailConfirmator } from '../../../../Contexts/LLBE/Users/application/UserEmailConfirmator';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';
import { AuthChecker } from '../../../../Contexts/LLBE/Users/domain/AuthChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';

export class EmailVerificationGetController implements Controller {
  private authChecker: AuthChecker;
  private confirmator: UserEmailConfirmator;

  constructor(authChecker: AuthChecker, confirmator: UserEmailConfirmator) {
    this.authChecker = authChecker;
    this.confirmator = confirmator;
  }

  async run(req: Request, res: Response) {

    const token = new Token(req.query.token as string);
    let payload: Payload;
    try {
      payload = this.authChecker.check(token);
    } catch (e) {
      res.status(402).send({ message: e.message });
      return;
    }

    const userId = new UserId(payload.userId);

    try {
      await this.confirmator.run(userId);
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send({ error: e.message });
    }

    //TODO: hay que devolver un HTML en lugar de un JSON
    res.status(httpStatus.OK).send({ message: 'Account confirmed' });
  }
}
