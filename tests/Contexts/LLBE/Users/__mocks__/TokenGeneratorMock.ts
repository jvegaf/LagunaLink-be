import { TokenGenerator } from '../../../../../src/Contexts/Shared/application/encoder/TokenGenerator';
import { Payload } from '../../../../../src/Contexts/Shared/application/encoder/Payload';
import { Token } from '../../../../../src/Contexts/Shared/application/encoder/Token';

export class TokenGeneratorMock implements TokenGenerator {
  run(payload: Payload): Token {
    return new Token('asdasdasdasd');
  }
}
