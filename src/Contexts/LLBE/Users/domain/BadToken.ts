export class BadToken extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'BadToken';
  }
}
