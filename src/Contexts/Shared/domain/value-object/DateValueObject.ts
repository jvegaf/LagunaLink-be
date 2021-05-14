export abstract class DateValueObject {
  private value: Date;

  constructor(value?: Date) {
    this.value = value || new Date();
  }

  stringValue(): string {
    return this.value.toISOString().substr(0, 10);
  }

  yearMonthValue(): string {
    return this.value.toISOString().substr(0, 7);
  }
}
