import { UserUpdatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserUpdatedAt';
import { PastDateMother } from '../../../Shared/domain/PastDateMother';

export class UserUpdatedAtMother {
  static create(value: string): UserUpdatedAt {
    return new UserUpdatedAt(value);
  }

  static random(): UserUpdatedAt {
    return this.create(PastDateMother.random().toISOString());
  }
}
