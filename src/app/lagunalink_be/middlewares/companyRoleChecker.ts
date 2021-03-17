import { NextFunction, Request, Response } from 'express';

export const companyRoleChecker = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.payload.role !== 'ROLE_COMPANY') {
    return res.status(403).send({ message: 'Access token does not have the required scope' });
  }

  next();
};
