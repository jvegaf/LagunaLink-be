import { JobOpeningId } from '../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { CompanyId } from '../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { JobOpenDescription } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenDescription';
import { JobOpenPosition } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPosition';
import { JobOpenConditions } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenConditions';
import { JobOpenResponsibilities } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenResponsibilities';
import { JobOpenQualification } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenQualification';
import { JobOpenPrevExperience } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPrevExperience';
import { JobOpening } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpening';
import { CreateJobOpeningRequest } from '../../../../../src/Contexts/LLBE/JobOpenings/application/Create/CreateJobOpeningRequest';
import { JobOpeningIdMother } from '../../Shared/domain/JobOpenings/JobOpeningIdMother';
import { CompanyIdMother } from '../../Shared/domain/Companies/CompanyIdMother';
import { JobOpenDescriptionMother } from './JobOpenDescriptionMother';
import { JobPositionMother } from '../../Students/domain/JobPositionMother';
import { JobOpenConditionsMother } from './JobOpenConditionsMother';
import { JobOpenResponsibilitiesMother } from './JobOpenResponsibilitiesMother';
import { JobOpenQualificationMother } from './JobOpenQualificationMother';
import { JobOpenPrevExperienceMother } from './JobOpenPrevExperienceMother';
import { UpgradeJobOpeningRequest } from '../../../../../src/Contexts/LLBE/JobOpenings/application/Update/UpgradeJobOpeningRequest';
import { JobOpenCreatedAt } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenCreatedAt';
import { JobOpenHiringDate } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenHiringDate';
import { JobOpenHiringDateMother } from './JobOpenHiringDateMother';
import { JobOpenPositionMother } from './JobOpenPositionMother';

export class JobOpeningMother {
  static create(
    id: JobOpeningId,
    createdAt: JobOpenCreatedAt,
    company: CompanyId,
    description: JobOpenDescription,
    position: JobOpenPosition,
    conditions: JobOpenConditions,
    responsibilities: JobOpenResponsibilities,
    qualification: JobOpenQualification,
    prevExperience: JobOpenPrevExperience,
    hiringDate: JobOpenHiringDate
  ): JobOpening {
    return new JobOpening({
      id,
      createdAt,
      company,
      description,
      position,
      conditions,
      responsibilities,
      qualification,
      prevExperience,
      hiringDate
    });
  }

  static fromCreateRequest(request: CreateJobOpeningRequest): JobOpening {
    return this.create(
      JobOpeningIdMother.random(),
      JobOpenCreatedAt.now(),
      CompanyIdMother.create(request.company),
      JobOpenDescriptionMother.create(request.description),
      JobOpenPositionMother.create(request.position),
      JobOpenConditionsMother.create(request.conditions),
      JobOpenResponsibilitiesMother.create(request.responsibilities),
      JobOpenQualificationMother.create(request.qualification),
      JobOpenPrevExperienceMother.create(request.prevExperience),
      JobOpenHiringDateMother.create(request.hiringDate)
    );
  }

  static fromUpgradeRequest(request: UpgradeJobOpeningRequest): JobOpening {
    return this.create(
      JobOpeningIdMother.create(request.id),
      JobOpenCreatedAt.now(),
      CompanyIdMother.create(request.company),
      JobOpenDescriptionMother.create(request.description),
      JobOpenPositionMother.create(request.position),
      JobOpenConditionsMother.create(request.conditions),
      JobOpenResponsibilitiesMother.create(request.responsibilities),
      JobOpenQualificationMother.create(request.qualification),
      JobOpenPrevExperienceMother.create(request.prevExperience),
      JobOpenHiringDateMother.create(request.hiringDate)
    );
  }

  static random(): JobOpening {
    return this.create(
      JobOpeningIdMother.random(),
      JobOpenCreatedAt.now(),
      CompanyIdMother.random(),
      JobOpenDescriptionMother.random(),
      JobPositionMother.random(),
      JobOpenConditionsMother.random(),
      JobOpenResponsibilitiesMother.random(),
      JobOpenQualificationMother.random(),
      JobOpenPrevExperienceMother.random(),
      JobOpenHiringDateMother.random()
    );
  }
}
