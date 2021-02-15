import { JobOpenCompany } from '../../../../../src/Contexts/LLBE/Students/domain/JobOpenCompany';
import { CompNameMother } from '../../../Shared/domain/CompNameMother';

export class JobCompanyMother {
  static create(value: string): JobOpenCompany {
    return new JobOpenCompany(value);
  }

  static random(): JobOpenCompany {
    return this.create(CompNameMother.random());
  }
}
