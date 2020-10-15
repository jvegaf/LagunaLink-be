import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';
import { AuthRole } from '../domain/AuthRole';
import { Payload } from '../domain/Payload';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { User } from '../domain/User';

export abstract class AuthRoleChecker implements AuthRole {
  abstract readonly ROLE: string;

  check(payload: Payload): void {
    if (payload.role !== this.ROLE) {
      throw new InvalidArgumentError('Bad Role');
    }
  }
}
