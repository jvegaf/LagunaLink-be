import { LanguageLevel } from './LanguageLevel';
import { LanguageName } from './LanguageName';

export class Language {
    readonly name: LanguageName;
    readonly speak: LanguageLevel;
    readonly write: LanguageLevel;

    constructor(name: LanguageName, speak: LanguageLevel, write: LanguageLevel) {
        this.name = name;
        this.speak = speak;
        this.write = write;
    }

    static fromPrimitives(plaindata: { name: string, speak: number, write: number }) {
        return new Language(
            new LanguageName(plaindata.name),
            new LanguageLevel(plaindata.speak),
            new LanguageLevel(plaindata.write)
        );
    }

    toPrimitives() {
        return {
            name: this.name.value,
            speak: this.speak.value,
            write: this.write.value
        };
    }
}
