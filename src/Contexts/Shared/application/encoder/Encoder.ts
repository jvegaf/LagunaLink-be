import { Payload } from './Payload';
import { Token } from './Token';

export interface Encoder {
  encode(payload: Payload): Token;

  decode(token: Token): Payload;
}
