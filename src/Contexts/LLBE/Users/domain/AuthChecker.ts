import { Payload } from './Payload';
import { Token } from './Token';

export interface AuthChecker {
  check(token: Token): Payload;
}
