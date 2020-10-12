import { AuthRoleChecker } from './AuthRoleChecker';

export class StudentRoleChecker extends AuthRoleChecker {
  readonly ROLE: string;

  constructor() {
    super();
    this.ROLE = 'ROLE_STUDENT';
  }
}
