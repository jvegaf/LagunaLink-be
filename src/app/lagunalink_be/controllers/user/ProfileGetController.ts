import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { UserProfiler } from '../../../../Contexts/LLBE/Shared/application/Users/UserProfiler';

export class ProfileGetController implements Controller {
  private profiler: UserProfiler;

  constructor(profiler: UserProfiler) {
    this.profiler = profiler;
  }

  async run(req: Request, res: Response) {
    const profile = await this.profiler.run({userId: req.body.payload.userId, role: req.body.payload.role});

    res.status(200).send({ profile });
  }
}
