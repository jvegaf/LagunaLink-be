import {LanguageLevel} from "./LanguageLevel";

export class Language {
    readonly name: string;
    readonly speak: LanguageLevel;
    readonly write: LanguageLevel;

    constructor(name: string, speak: LanguageLevel, write: LanguageLevel) {
        this.name = name;
        this.speak = speak;
        this.write = write;
    }

    static fromPrimitives(plaindata: { name: string, speak: number, write: number }) {
        return new Language(
            plaindata.name,
            new LanguageLevel(plaindata.speak),
            new LanguageLevel(plaindata.write)
        );
    }

    toPrimitives() {
        return {
            name: this.name,
            speak: this.speak.value,
            write: this.write.value
        };
    }
}
