import { CompanyName } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyName';
import { CompNameMother } from '../../../Shared/domain/CompNameMother';

export class CompanyNameMother {
  static create(value: string): CompanyName {
    return new CompanyName(value);
  }

  static random(): CompanyName {
    return this.create(CompNameMother.random());
  }
}
