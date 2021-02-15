import { CompanyDescription } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyDescription';
import { ParagraphMother } from '../../../Shared/domain/ParagraphMother';

export class CompanyDescriptionMother {
  static create(value: string): CompanyDescription {
    return new CompanyDescription(value);
  }

  static random(): CompanyDescription {
    return this.create(ParagraphMother.random());
  }
}
