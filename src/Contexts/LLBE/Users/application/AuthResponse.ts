export class AuthResponse {
  readonly code: number;
  readonly message: string;
  readonly userId?: string;
  readonly token?: string;

  constructor(code: number, message: string, userId?: string, token?: string ) {
    this.code = code;
    this.message = message;
    this.userId = userId;
    this.token = token;
  }
}
