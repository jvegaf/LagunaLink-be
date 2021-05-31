export class JobOpeningNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JobOpeningNotFound';
  }
}
