export class Message {

  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly body: string;

  constructor(from: string, to:string, subject: string, body: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.body = body;
  }

}
