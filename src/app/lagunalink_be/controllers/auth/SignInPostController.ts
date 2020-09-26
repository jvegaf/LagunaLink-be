import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserAuth } from '../../../../Contexts/LLBE/Users/application/UserAuth';
import { AuthUserRequest } from '../../../../Contexts/LLBE/Users/application/AuthUserRequest';

export class SignInPostController implements Controller {
  constructor(private userAuth: UserAuth) {}

  async run(req: Request, res: Response) {
    const request: AuthUserRequest = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const response = await this.userAuth.run(request);
      res
        .status(httpStatus.OK)
        .send({ message: response.message, access_token: response.token });
    } catch (e) {
      res.status(httpStatus.BAD_REQUEST).send({ error: e.message });
    }
  }
}
