export class AuthResponse {
  readonly message: string;
  readonly token?: string;
  readonly code: number;

  constructor(code: number, message: string, token?: string ) {
    this.code = code;
    this.message = message;
    this.token = token;
  }
}
