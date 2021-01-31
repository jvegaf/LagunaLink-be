import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserAuth } from '../../../../Contexts/LLBE/Users/application/UserAuth';
import { AuthUserRequest } from '../../../../Contexts/LLBE/Users/application/AuthUserRequest';
import { AccountNotConfirmed } from '../../../../Contexts/LLBE/Users/application/AccountNotConfirmed';

const NOT_ACTIVE_STATUS_CODE = 450;

export class SignInPostController implements Controller {
  constructor(private userAuth: UserAuth) {
  }

  async run(req: Request, res: Response) {
    const request: AuthUserRequest = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const response = await this.userAuth.run(request);
      res
        .status(response.code)
        .send({ message: response.message, access_token: response.token });
    } catch (e) {
      if (e.name === 'AccountNotConfirmed') {
        res.status(NOT_ACTIVE_STATUS_CODE).send();
      }
      res.status(httpStatus.BAD_REQUEST).send({error: e.message});
    }
  }
}
