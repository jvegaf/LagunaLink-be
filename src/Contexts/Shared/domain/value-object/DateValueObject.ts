export abstract class DateValueObject {
    private date: Date;

    constructor(value: string) {
        this.date = new Date(value);
    }

    toString(): string {
        return this.date.toISOString().substr(0, 10);
    }

    toISOString(): string {
        return this.date.toISOString();
    }
}
