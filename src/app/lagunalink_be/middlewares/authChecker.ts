import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jwt-simple';

export const authChecker = (req: Request, res: Response, next: NextFunction) => {
  const KEY: string = process.env.SECRET_KEY!;

  if (req.headers.authorization === undefined) {
    return res.status(httpStatus.PAYMENT_REQUIRED).send();
  }

  const token = req.headers.authorization;
  let tokenSanitized = token;
  if (token.indexOf(' ') > 0) {
    tokenSanitized = token.split(' ')[1];
  }

  try {
    req.body.payload = jwt.decode(tokenSanitized, KEY);
    next();
  } catch (error) {
    const message = `BAD TOKEN: ${error.message}`;
    console.log(message);
    return res.status(402).send({message});
  }
};
