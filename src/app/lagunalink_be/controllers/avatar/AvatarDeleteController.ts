import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { UserId } from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';
import { AvatarRemover } from '../../../../Contexts/LLBE/Users/application/AvatarRemover';

// noinspection SpellCheckingInspection
export class AvatarDeleteController implements Controller {
  private remover: AvatarRemover;

  constructor(remover: AvatarRemover) {
    this.remover = remover;
  }

  async run(req: Request, res: Response) {
    await this.remover.run(new UserId(req.params.id));
  }
}
