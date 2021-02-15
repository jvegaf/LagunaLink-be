import { WordMother } from '../../../Shared/domain/WordMother';
import { LanguageName } from '../../../../../src/Contexts/LLBE/Students/domain/LanguageName';

export class LanguageNameMother {
  static create(value: string): LanguageName {
    return new LanguageName(value);
  }

  static random(): LanguageName {
    return this.create(WordMother.random());
  }
}
