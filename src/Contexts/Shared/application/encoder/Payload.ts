export class Payload {
  readonly subject: string;
  readonly userId: string;
  readonly role: string;

  constructor(subject: string, userId: string, role: string) {
    this.subject = subject;
    this.userId = userId;
    this.role = role;
  }
}
