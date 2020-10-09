import { AuthChecker } from '../../domain/AuthChecker';
import jwt from 'jwt-simple';
import { Payload } from '../../domain/Payload';
import { Token } from '../../domain/Token';
import { BadToken } from '../../domain/BadToken';

export class AuthJWTChecker implements AuthChecker {
  check(token: Token): Payload {
    let payload: Payload;
    const tokenSanitized = token.value.split(' ')[1];

    const key: string = process.env.SECRET_KEY!;
    // @ts-ignore
    try {
      payload = jwt.decode(tokenSanitized, key);
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      console.log('bad token: ' + error.message);
      throw new BadToken(error.message);
    }
    return payload;
  }
}
