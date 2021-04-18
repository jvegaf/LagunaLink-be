import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jwt-simple';

export const authEmailConfirmationChecker = (req: Request, res: Response, next: NextFunction) => {
  const KEY: string = process.env.SECRET_KEY!;

  const accessToken = req.query?.token as string;
  if (accessToken === null) {
    res.status(httpStatus.BAD_REQUEST).send({error: 'Bad Token'});
  }

  try {
    req.body.payload = jwt.decode(accessToken, KEY);
    next();
  }
  catch (error) {
    const message = `BAD TOKEN: ${error.message}`;
    console.log(message);
    return res.status(402).send({message});
  }
};
