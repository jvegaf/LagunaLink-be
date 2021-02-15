import { WordMother } from '../../../Shared/domain/WordMother';
import { TitleName } from '../../../../../src/Contexts/LLBE/Students/domain/TitleName';

export class TitleNameMother {
  static create(value: string): TitleName {
    return new TitleName(value);
  }

  static random(): TitleName {
    return this.create(WordMother.random());
  }
}
