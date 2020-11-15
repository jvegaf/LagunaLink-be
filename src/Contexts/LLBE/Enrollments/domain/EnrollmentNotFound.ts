export class EnrollmentNotFound extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'EnrollmentNotFound';
  }
}
