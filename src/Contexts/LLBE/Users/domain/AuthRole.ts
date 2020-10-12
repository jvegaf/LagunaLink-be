export interface AuthRole {
  ROLE: string;

  check(role: string): void;
}
