import {Request, Response} from 'express';
import {Controller} from '../Controller';
import {AvatarFinder} from '../../../../Contexts/LLBE/Users/application/AvatarFinder';
import {UserId} from '../../../../Contexts/LLBE/Shared/domain/Users/UserId';

export class AvatarGetController implements Controller {
  private finder: AvatarFinder;

  constructor(finder: AvatarFinder) {
    this.finder = finder;
  }

  async run(req: Request, res: Response) {
    const avatar = await this.finder.run(new UserId(req.params.id));

    res.status(200).send({avatarId: avatar.value});
  }
}
