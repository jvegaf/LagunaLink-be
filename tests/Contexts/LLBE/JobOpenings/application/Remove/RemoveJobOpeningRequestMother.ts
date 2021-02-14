import { CompanyId } from '../../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyIdMother } from '../../../Shared/domain/Companies/CompanyIdMother';
import { JobOpeningId } from '../../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningIdMother } from '../../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { RemoveJobOpeningRequest } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Remove/RemoveJobOpeningRequest';

export class RemoveJobOpeningRequestMother {
  static create(
    id: JobOpeningId,
    company: CompanyId
  ): RemoveJobOpeningRequest {
    return {
      id: id.value,
      company: company.value
    };
  }

  static random(): RemoveJobOpeningRequest {
    return this.create(
      JobOpeningIdMother.random(),
      CompanyIdMother.random()
    );
  }
}
