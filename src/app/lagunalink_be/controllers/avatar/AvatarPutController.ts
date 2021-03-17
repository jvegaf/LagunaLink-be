import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AvatarUpdater } from '../../../../Contexts/LLBE/Users/application/AvatarUpdater';
import { UpdateAvatarRequest } from '../../../../Contexts/LLBE/Users/application/UpdateAvatarRequest';

export class AvatarPutController implements Controller {
  private updater: AvatarUpdater;

  constructor(updater: AvatarUpdater) {
    this.updater = updater;
  }

  async run(req: Request, res: Response) {
    const request: UpdateAvatarRequest = {
      userId: req.body.payload.userId,
      path: req.file.path,
    };

    await this.updater.run(request);

    res.status(201).send();
  }
}
