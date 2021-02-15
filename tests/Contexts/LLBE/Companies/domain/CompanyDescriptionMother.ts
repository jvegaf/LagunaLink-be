import { WordMother } from '../../../Shared/domain/WordMother';
import { CompanyDescription } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyDescription';

export class CompanyDescriptionMother {
  static create(value: string): CompanyDescription {
    return new CompanyDescription(value);
  }

  static random(): CompanyDescription {
    return this.create(WordMother.random());
  }
}
