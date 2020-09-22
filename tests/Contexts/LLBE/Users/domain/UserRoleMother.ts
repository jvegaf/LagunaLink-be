import { UserRole } from "../../../../../src/Contexts/LLBE/Users/domain/UserRole";
import { MotherCreator } from "../../../Shared/domain/MotherCreator";

export class UserRoleMother {
  static create(value: string): UserRole {
    return new UserRole(value);
  }

  static random(): UserRole {
    return this.create(MotherCreator.random().random.arrayElement(["ROLE_STUDENT","ROLE_COMPANY"]));
  }
}
