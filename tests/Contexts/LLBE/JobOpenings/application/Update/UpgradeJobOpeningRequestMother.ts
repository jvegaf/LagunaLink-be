import { CompanyId } from '../../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { JobOpenDescription } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenDescription';
import { JobOpenPosition } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPosition';
import { JobOpenConditions } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenConditions';
import { JobOpenResponsibilities } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenResponsibilities';
import { JobOpenQualification } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenQualification';
import { JobOpenPrevExperience } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPrevExperience';
import { CompanyIdMother } from '../../../Shared/domain/Companies/CompanyIdMother';
import { JobOpenDescriptionMother } from '../../domain/JobOpenDescriptionMother';
import { JobOpenPositionMother } from '../../domain/JobOpenPositionMother';
import { JobOpenConditionsMother } from '../../domain/JobOpenConditionsMother';
import { JobOpenResponsibilitiesMother } from '../../domain/JobOpenResponsibilitiesMother';
import { JobOpenQualificationMother } from '../../domain/JobOpenQualificationMother';
import { JobOpenPrevExperienceMother } from '../../domain/JobOpenPrevExperienceMother';
import { UpgradeJobOpeningRequest } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Update/UpgradeJobOpeningRequest';
import { JobOpeningId } from '../../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { JobOpeningIdMother } from '../../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { JobOpenHiringDate } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenHiringDate';
import { JobOpenHiringDateMother } from '../../domain/JobOpenHiringDateMother';

export class UpgradeJobOpeningRequestMother {
  static create(
    id: JobOpeningId,
    company: CompanyId,
    description: JobOpenDescription,
    position: JobOpenPosition,
    conditions: JobOpenConditions,
    responsibilities: JobOpenResponsibilities,
    qualification: JobOpenQualification,
    prevExperience: JobOpenPrevExperience,
    hiringDate: JobOpenHiringDate
  ): UpgradeJobOpeningRequest {
    return {
      id: id.value,
      company: company.value,
      description: description.value,
      position: position.value,
      conditions: conditions.value,
      responsibilities: responsibilities.value,
      qualification: qualification.value,
      prevExperience: prevExperience.value,
      hiringDate: hiringDate.toString()
    };
  }

  static random(jobOpenId: string): UpgradeJobOpeningRequest {
    return this.create(
      JobOpeningIdMother.create(jobOpenId),
      CompanyIdMother.random(),
      JobOpenDescriptionMother.random(),
      JobOpenPositionMother.random(),
      JobOpenConditionsMother.random(),
      JobOpenResponsibilitiesMother.random(),
      JobOpenQualificationMother.random(),
      JobOpenPrevExperienceMother.random(),
      JobOpenHiringDateMother.random()
    );
  }
}
