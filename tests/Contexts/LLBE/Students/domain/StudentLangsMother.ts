import {Language} from "../../../../../src/Contexts/LLBE/Students/domain/Language";
import {LanguageNameMother} from "./LanguageNameMother";
import {LangLevelMother} from "./LangLevelMother";

export class StudentLangsMother {
    static create(value: Language): Language[] {
        let langs = [];
        langs.push(value);
        return langs;
    }

    static random(): Language[] {
        let studentLang = this.createRandomLang();
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
        let langs = [];
        let lang = this.createRandomLang();
        langs.push(lang.toPrimitives());
        return langs;
  }
}
