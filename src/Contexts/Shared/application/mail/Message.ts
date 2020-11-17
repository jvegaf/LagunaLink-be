export class Message {
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly template: string;
  readonly uri: string;

  constructor(from: string, to: string, subject: string, template: string, uri: string) {
    this.template = template;
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.uri = uri;
  }

  toJSON() {
    return {
      from: this.from,
      to: this.to,
      subject: this.subject,
      template: this.template,
      context : {
        uriPath: this.uri,
      }
    };
  }
}
