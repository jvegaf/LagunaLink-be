import { TokenGenerator } from '../../application/encoder/TokenGenerator';
import jwt from 'jwt-simple';
import { Token } from '../../application/encoder/Token';

export class JWTTokenGenerator implements TokenGenerator {
  run(payload: any): Token {
    const secretKey: string = process.env.SECRET_KEY!;

    return new Token(jwt.encode(payload, secretKey));
  }
}
