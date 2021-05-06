import { UserCreatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserCreatedAt';
import { PastDateMother } from '../../../Shared/domain/PastDateMother';

export class UserCreatedAtMother {
  static create(value: string): UserCreatedAt {
    return new UserCreatedAt(value);
  }

  static random(): UserCreatedAt {
    return this.create(PastDateMother.random().toISOString());
  }
}
