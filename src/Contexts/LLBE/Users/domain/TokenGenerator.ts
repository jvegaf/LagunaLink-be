import { Token } from './Token';

export interface TokenGenerator {
  run(payload: object): Token;
}
