import { WordMother } from '../../../Shared/domain/WordMother';
import {TitleName} from "../../../../../src/Contexts/LLBE/Students/domain/TitleName";
import {LanguageName} from "../../../../../src/Contexts/LLBE/Students/domain/LanguageName";

export class LanguageNameMother {
  static create(value: string): LanguageName {
    return new LanguageName(value);
  }

  static random(): LanguageName {
    return this.create(WordMother.random());
  }
}
