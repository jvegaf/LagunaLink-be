export class StudentNotFound extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'StudentNotFound';
  }
}
