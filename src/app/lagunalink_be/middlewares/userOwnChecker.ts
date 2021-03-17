import { NextFunction, Request, Response } from 'express';

export const userOwnChecker = (req: Request, res: Response, next: NextFunction) => {

  if (req.body.payload.userId !== req.params.id) {
    return res.status(403).send({message: 'User does not have permission for the required scope'});
  }

  next();
};
