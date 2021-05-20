export class Timestamp {
  private value: Date;
  constructor() {
    this.value = new Date();
  }

  static now(): string {
    return new Timestamp().value.toISOString().substr(0, 10);
  }
}
