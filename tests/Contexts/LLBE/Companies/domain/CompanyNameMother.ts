import { WordMother } from '../../../Shared/domain/WordMother';
import {CompanyName} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyName";

export class CompanyNameMother {
  static create(value: string): CompanyName {
    return new CompanyName(value);
  }

  static random(): CompanyName {
    return this.create(WordMother.random());
  }
}
