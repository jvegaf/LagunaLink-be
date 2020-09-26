import { BooleanMother } from '../../../Shared/domain/BooleanMother';
import { UserRegistered } from '../../../../../src/Contexts/LLBE/Users/domain/UserRegistered';

export class UserRegisteredMother {
  static create(value: boolean): UserRegistered {
    return new UserRegistered(value);
  }

  static random(): UserRegistered {
    return this.create(BooleanMother.random());
  }
}
