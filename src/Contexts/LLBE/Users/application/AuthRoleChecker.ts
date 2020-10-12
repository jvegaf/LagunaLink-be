import { UserRole } from '../domain/UserRole';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class AuthRoleChecker {
  private roles: Array<UserRole>;

  constructor(roles: Array<UserRole>) {
    this.roles = roles;
  }
  run(userRole: UserRole): void {
    let result = false;

    this.roles.forEach((role) => {
      if (role.value === userRole.value) {
        result = true;
      }
    });

    if (!result) {
      throw new InvalidArgumentError('Bad Role');
    }
  }
}
