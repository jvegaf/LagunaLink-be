import { Request, Response } from 'express';
import { Controller } from '../Controller';
import path from 'path';

export class AvatarGetController implements Controller {
  async run(req: Request, res: Response) {
    const avatar = path.join('/uploads', req.params.id);
    res.download(avatar, () => res.status(404).send());
  }
}
