export class AuthResponse {
  readonly message: string;
  readonly token?: string;

  constructor(message: string, token?: string) {
    this.message = message;
    this.token = token;
  }
}
