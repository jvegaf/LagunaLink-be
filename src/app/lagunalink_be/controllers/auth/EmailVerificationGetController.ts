import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { Token } from '../../../../Contexts/Shared/application/encoder/Token';
import { UserEmailTokenChecker } from '../../../../Contexts/LLBE/Users/application/UserEmailTokenChecker';

export class EmailVerificationGetController implements Controller {

  constructor(private userEmailVerf: UserEmailTokenChecker) {
  }

  async run(req: Request, res: Response) {

    const parameter = req.query?.token as string;
    if (parameter === null) { res.status(httpStatus.BAD_REQUEST).send({error: 'Bad Token'}); }
    const token = new Token(parameter);

    try {
      await this.userEmailVerf.check(token);
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send({error: e.message});
    }

    res.status(httpStatus.OK).send({message: 'Account confirmed'});
  }
}
