import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { AuthRole } from '../domain/AuthRole';

export abstract class AuthRoleChecker implements AuthRole {
  abstract readonly ROLE: string;

  check(role: string): void {
    if (role !== this.ROLE) {
      throw new InvalidArgumentError('Bad Role');
    }
  }
}
