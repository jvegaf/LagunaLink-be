export class AuthResponse {
  readonly code: number;
  readonly role?: string;
  readonly userId?: string;
  readonly token?: string;

  constructor(code: number, role?: string, userId?: string, token?: string ) {
    this.code = code;
    this.role = role;
    this.userId = userId;
    this.token = token;
  }
}
