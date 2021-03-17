import { NextFunction, Request, Response } from 'express';

export const studentRoleChecker = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.payload.role !== 'ROLE_STUDENT') {
    return res.status(403).send({ message: 'Access token does not have the required scope' });
  }

  next();
};
