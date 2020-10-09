import { TokenGenerator } from '../../../../../src/Contexts/LLBE/Users/domain/TokenGenerator';
import { Payload } from '../../../../../src/Contexts/LLBE/Users/domain/Payload';
import { Token } from '../../../../../src/Contexts/LLBE/Users/domain/Token';

export class TokenGeneratorMock implements TokenGenerator {
  run(payload: Payload): Token {
    return new Token('asdasdasdasd');
  }
}
