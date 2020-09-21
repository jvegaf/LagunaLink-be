import { UuidMother } from '../../../../Shared/domain/UuidMother';
import {CompanyId} from "../../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId";

export class CompanyIdMother {
  static create(value: string): CompanyId {
    return new CompanyId(value);
  }

  static creator() {
    return () => CompanyIdMother.random();
  }

  static random(): CompanyId {
    return this.create(UuidMother.random());
  }
}
