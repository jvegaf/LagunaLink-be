import { Uuid } from '../../../../Shared/domain/value-object/Uuid';

export class UserId extends Uuid {

  constructor(value: string) {
    super(value);
  }

  static create(): UserId {
    return new UserId(UserId.random().toString());
  }
}
