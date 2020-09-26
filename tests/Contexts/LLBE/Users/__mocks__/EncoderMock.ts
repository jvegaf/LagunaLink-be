import { Encoder } from '../../../../../src/Contexts/Shared/application/encoder/Encoder';
import { Payload } from '../../../../../src/Contexts/Shared/application/encoder/Payload';
import { Token } from '../../../../../src/Contexts/Shared/application/encoder/Token';

export class EncoderMock implements Encoder {
  decode(token: Token): Payload {
    return new Payload('asd', 'asd', 'asd');
  }

  encode(payload: Payload): Token {
    return new Token('asdasdasdasd');
  }
}
