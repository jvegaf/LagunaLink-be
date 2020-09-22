import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import { InvalidArgumentError } from "../../../Shared/domain/value-object/InvalidArgumentError";

export class UserRole extends StringValueObject {

  private roles = ["ROLE_STUDENT", "ROLE_COMPANY"];

  constructor(value: string) {
    super(value);
    this.ensureIsAValidRole(value);
  }

  static create(value: string): UserRole {
    return new UserRole(value);
  }

  private ensureIsAValidRole(value: string) {
    if (this.roles.indexOf(value) === -1){
      throw new InvalidArgumentError(`The role <${value}> is not valid`);
    }
  }
}
