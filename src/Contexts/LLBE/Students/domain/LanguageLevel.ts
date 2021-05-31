import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class LanguageLevel extends NumberValueObject {
  private readonly MIN_VAL = 1;
  private readonly MAX_VAL = 5;

  constructor(value: number) {
    super(value);
    this.ensureValueIsBetweenMINandMAX(value);
  }

  static create(value: number) {
    return new LanguageLevel(value);
  }

  private ensureValueIsBetweenMINandMAX(value: number): void {
    if (value < this.MIN_VAL || value > this.MAX_VAL) {
      throw new InvalidArgumentError(`the level should be between ${this.MIN_VAL} and ${this.MAX_VAL}`);
    }
  }
}
