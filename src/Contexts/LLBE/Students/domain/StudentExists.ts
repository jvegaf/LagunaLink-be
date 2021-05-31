export class StudentExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StudentExists';
  }
}
