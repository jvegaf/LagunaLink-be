import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class TitleName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
