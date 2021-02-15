import { Language } from '../../../../../src/Contexts/LLBE/Students/domain/Language';
import { LanguageNameMother } from './LanguageNameMother';
import { LangLevelMother } from './LangLevelMother';

export class StudentLangsMother {
  static create(value: Language): Language[] {
    const langs = [];
    langs.push(value);
    return langs;
  }

  static random(): Language[] {
    const studentLang = this.createRandomLang();
    return this.create(studentLang);
  }

  private static createRandomLang() {
    return new Language(
      LanguageNameMother.random(),
      LangLevelMother.random(),
      LangLevelMother.random()
    );
  }

  static randomToPrimitives() {
    const langs = [];
    const lang = this.createRandomLang();
    langs.push(lang.toPrimitives());
    return langs;
  }
}
