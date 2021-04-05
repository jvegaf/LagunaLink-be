export class UserAvatarNotFound extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'UserAvatarNotFound';
  }
}
