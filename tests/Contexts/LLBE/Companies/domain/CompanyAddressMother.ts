import {CompanyAddress} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyAddress";
import {AddressMother} from "../../../Shared/domain/AddressMother";

export class CompanyAddressMother {
  static create(value: string): CompanyAddress {
    return new CompanyAddress(value);
  }

  static random(): CompanyAddress {
    return this.create(AddressMother.random());
  }
}
