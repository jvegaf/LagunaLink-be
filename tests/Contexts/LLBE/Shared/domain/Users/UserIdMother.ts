import { UuidMother } from '../../../../Shared/domain/UuidMother';
import { UserId } from '../../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }

  static creator() {
    return () => UserIdMother.random();
  }

  static random(): UserId {
    return this.create(UuidMother.random());
  }
}
