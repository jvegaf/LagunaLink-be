import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { WordMother } from '../../../Shared/domain/WordMother';
import {JobCompany} from "../../../../../src/Contexts/LLBE/Students/domain/JobCompany";

export class JobCompanyMother {
  static create(value: string): JobCompany {
    return new JobCompany(value);
  }

  static random(): JobCompany {
    return this.create(WordMother.random());
  }
}
