import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AvatarFetcher } from '../../../../Contexts/LLBE/Users/application/AvatarFetcher';

export class AvatarGetController implements Controller {

  constructor(fetcher: AvatarFetcher) {
  }

  async run(req: Request, res: Response) {}
}
