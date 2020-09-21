import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { WordMother } from '../../../Shared/domain/WordMother';
import {JobOpenCompany} from "../../../../../src/Contexts/LLBE/Students/domain/JobOpenCompany";

export class JobCompanyMother {
  static create(value: string): JobOpenCompany {
    return new JobOpenCompany(value);
  }

  static random(): JobOpenCompany {
    return this.create(WordMother.random());
  }
}
