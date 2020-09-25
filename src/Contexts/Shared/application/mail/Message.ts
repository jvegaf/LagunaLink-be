export class Message {
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly html: string;

  constructor(from: string, to: string, subject: string, html: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.html = html;
  }

  toJSON() {
    return {
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.html,
    };
  }
}
