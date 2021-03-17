export abstract class ImageValueObject {
  readonly value: string;

  constructor(value?: string) {
    this.value = value || '';
  }
}
