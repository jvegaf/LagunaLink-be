import { Encoder } from '../../application/encoder/Encoder';
import { encode, decode } from 'jwt-simple';
import { Token } from '../../application/encoder/Token';
import { Payload } from '../../application/encoder/Payload';

export class JWTEncoder implements Encoder {
  private readonly KEY: string =
    '5ZnbCE1kNsMrboa3cZR1gx2TrhpC157LrBFw1I9nBlzSD3dn9zQy9dJB4Pqpwdn';

  decode(token: Token): Payload {
    const decoded = decode(token.value, this.KEY);
    return new Payload(decoded.sub, decoded.userId, decoded.role);
  }

  encode(payload: Payload): Token {
    return new Token(encode(payload, this.KEY, 'HS256'));
  }
}
