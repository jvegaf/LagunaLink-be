import { Payload } from './Payload';
import { Token } from './Token';

export interface TokenGenerator {
  run(payload: Payload): Token;
}
