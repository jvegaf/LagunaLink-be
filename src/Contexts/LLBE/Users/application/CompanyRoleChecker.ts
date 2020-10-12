import { AuthRoleChecker } from './AuthRoleChecker';

export class CompanyRoleChecker extends AuthRoleChecker {
  readonly ROLE: string;

  constructor() {
    super();
    this.ROLE = 'ROLE_COMPANY';
  }
}
