import { UserUpdatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserUpdatedAt';
import { DateMother } from '../../../Shared/domain/DateMother';

export class UserUpdatedAtMother {
  static create(value: string): UserUpdatedAt {
    return new UserUpdatedAt(value);
  }

  static random(): UserUpdatedAt {
    return this.create(DateMother.random().toISOString());
  }
}
