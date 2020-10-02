import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../../../Contexts/Shared/application/encoder/Payload';
import { JWTTokenGenerator } from '../../../Contexts/Shared/infrastructure/encoder/JWTTokenGenerator';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = req.headers['Authorization'] as string;
  let jwtPayload: Payload;

  const secretKey: string = process.env.SECRET_KEY!;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, secretKey) as any;
    req.body.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send({ message: error.message });
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const tokenGenerator = new JWTTokenGenerator();

  const newToken = tokenGenerator.run(jwtPayload);
  req.body.access_token = newToken.value;

  //Call the next middleware or controller
  next();
};
