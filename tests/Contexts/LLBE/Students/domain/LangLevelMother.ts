import {LanguageLevel} from "../../../../../src/Contexts/LLBE/Students/domain/LanguageLevel";
import {IntegerMother} from "../../../Shared/domain/IntegerMother";

export class LangLevelMother {
    static create(value: number): LanguageLevel {
        return new LanguageLevel(value);
    }

    static random(): LanguageLevel {
        let value = IntegerMother.random(4) + 1;
        return this.create(value);
    }
}
