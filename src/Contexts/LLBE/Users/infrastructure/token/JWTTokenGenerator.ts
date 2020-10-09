import { TokenGenerator } from '../../domain/TokenGenerator';
import jwt from 'jwt-simple';
import { Token } from '../../domain/Token';
import { Payload } from '../../domain/Payload';

export class JWTTokenGenerator implements TokenGenerator {
  run(payload: Payload): Token {
    const secretKey: string = process.env.SECRET_KEY!;

    return new Token(jwt.encode(payload, secretKey));
  }
}
