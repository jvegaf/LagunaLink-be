import { TitleName } from '../../../../../src/Contexts/LLBE/Students/domain/TitleName';
import { DegreeTitleMother } from '../../../Shared/domain/DegreeTitleMother';

export class TitleNameMother {
  static create(value: string): TitleName {
    return new TitleName(value);
  }

  static random(): TitleName {
    return this.create(DegreeTitleMother.random());
  }
}
