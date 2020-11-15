export class UserAuthFail extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'UserAuthFail';
  }
}
