import { Payload } from './Payload';

export interface AuthRole {
  ROLE: string;

  check(payload: Payload): void;
}
