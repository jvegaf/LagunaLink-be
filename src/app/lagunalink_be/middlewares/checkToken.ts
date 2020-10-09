import { Request, Response, NextFunction } from 'express';
import jwt from 'jwt-simple';
import { JWTTokenGenerator } from '../../../Contexts/LLBE/Users/infrastructure/token/JWTTokenGenerator';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token: string = req.headers.authorization!;
  let jwtPayload;
  const tokenSanitized = token.split(' ')[1];

  //Try to validate the token and get data

  const secretKey: string = process.env.SECRET_KEY!;
  // @ts-ignore
  try {
    jwtPayload = jwt.decode(tokenSanitized, secretKey);
    req.body.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log('bad token: ' + error.message);
    res.status(402).send({ message: error.message });
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
