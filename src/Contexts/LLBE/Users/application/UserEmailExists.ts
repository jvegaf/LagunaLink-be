export class UserEmailExists extends Error {
  readonly code: number;

  constructor(message: string) {
    super(message);
    this.name = 'UserEmailExists';
    this.code = 430;
  }
}
