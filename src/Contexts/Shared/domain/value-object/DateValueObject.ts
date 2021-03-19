export abstract class DateValueObject {
  private date: Date;

  constructor(value: string) {
    this.date = new Date(value);
  }

  toString(): string {
    return this.date.toISOString().substr(0, 10);
  }

  yearMonthValue(): string {
    return this.date.toISOString().substr(0, 7);
  }

  toISOString(): string {
    return this.date.toISOString();
  }
}
