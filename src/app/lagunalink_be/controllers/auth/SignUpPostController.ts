import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import { UserCreator } from '../../../../Contexts/LLBE/Users/application/UserCreator';
import { CreateUserRequest } from '../../../../Contexts/LLBE/Users/application/CreateUserRequest';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';
import { Timestamp } from '../../../../Contexts/LLBE/Shared/domain/Timestamp';

export class SignUpPostController implements Controller {
  constructor(private userCreator: UserCreator) {}

  async run(req: Request, res: Response) {
    const newId = UserId.create();

    const request: CreateUserRequest = {
      id: newId.toString(),
      email: req.body.email,
      password: req.body.password,
      isActive: false,
      role: req.body.role,
      registered: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    try {
      await this.userCreator.run(request);
    } catch (e) {
      res.status(e.code).send({ error: e.message });
    }

    res.status(httpStatus.CREATED).send();
  }
}
