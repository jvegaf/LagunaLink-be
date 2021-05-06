import { CreateJobOpeningRequest } from '../../../../../../src/Contexts/LLBE/JobOpenings/application/Create/CreateJobOpeningRequest';
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
import { JobOpenHiringDate } from '../../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenHiringDate';
import { JobOpenHiringDateMother } from '../../domain/JobOpenHiringDateMother';

export class CreateJobOpeningRequestMother {
  static create(
    company: CompanyId,
    description: JobOpenDescription,
    position: JobOpenPosition,
    conditions: JobOpenConditions,
    responsibilities: JobOpenResponsibilities,
    qualification: JobOpenQualification,
    prevExperience: JobOpenPrevExperience,
    hiringDate: JobOpenHiringDate
  ): CreateJobOpeningRequest {
    return {
      company: company.value,
      description: description.value,
      position: position.value,
      conditions: conditions.value,
      responsibilities: responsibilities.value,
      qualification: qualification.value,
      prevExperience: prevExperience.value,
      hiringDate: hiringDate.toISOString()
    };
  }

  static random(): CreateJobOpeningRequest {
    return this.create(
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

  static randomOfCompany(companyId: string): CreateJobOpeningRequest {
    return this.create(
      CompanyIdMother.create(companyId),
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
