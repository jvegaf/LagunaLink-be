import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: Array<string>) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRole = req.body.jwtPayload.role;

  if (!roles.includes(userRole)) {
    res.status(401).send();
  }

  next();
};
