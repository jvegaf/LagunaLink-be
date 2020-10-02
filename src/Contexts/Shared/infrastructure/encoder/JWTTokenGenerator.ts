import { TokenGenerator } from '../../application/encoder/TokenGenerator';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../../application/encoder/Payload';
import { Token } from '../../application/encoder/Token';

export class JWTTokenGenerator implements TokenGenerator {
  run(payload: Payload): Token {
    const secretKey: string = process.env.SECRET_KEY!;

    return new Token(
      jwt.sign(payload, secretKey, {
        expiresIn: '1h',
      })
    );
  }
}
