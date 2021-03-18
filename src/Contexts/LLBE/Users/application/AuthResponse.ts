export class AuthResponse {
  readonly code: number;
  readonly role?: string;
  readonly userId?: string;
  readonly token?: string;
  readonly email?: string;
  readonly avatar?: string;

  constructor(code: number, role?: string, userId?: string, token?: string, email?: string, avatar?: string ) {
    this.code = code;
    this.role = role;
    this.userId = userId;
    this.token = token;
    this.email = email;
    this.avatar = avatar;
  }
}
