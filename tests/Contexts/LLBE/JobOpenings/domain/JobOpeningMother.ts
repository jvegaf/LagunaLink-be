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

export class JobOpeningMother {
  static create(
    id: JobOpeningId,
    createdAt: JobOpenCreatedAt,
    company: CompanyId,
    title: JobOpenDescription,
    position: JobOpenPosition,
    conditions: JobOpenConditions,
    responsibilities: JobOpenResponsibilities,
    qualification: JobOpenQualification,
    prevExperience: JobOpenPrevExperience
  ): JobOpening {
    return new JobOpening(
      id,
      createdAt,
      company,
      title,
      position,
      conditions,
      responsibilities,
      qualification,
      prevExperience
    );
  }

  static fromCreateRequest(request: CreateJobOpeningRequest): JobOpening {
    return this.create(
      JobOpeningIdMother.random(),
      JobOpenCreatedAt.now(),
      CompanyIdMother.create(request.company),
      JobOpenDescriptionMother.create(request.description),
      JobPositionMother.create(request.position),
      JobOpenConditionsMother.create(request.conditions),
      JobOpenResponsibilitiesMother.create(request.responsibilities),
      JobOpenQualificationMother.create(request.qualification),
      JobOpenPrevExperienceMother.create(request.prevExperience)
    );
  }

  static fromUpgradeRequest(request: UpgradeJobOpeningRequest): JobOpening {
    return this.create(
      JobOpeningIdMother.create(request.id),
      JobOpenCreatedAt.now(),
      CompanyIdMother.create(request.company),
      JobOpenDescriptionMother.create(request.description),
      JobPositionMother.create(request.position),
      JobOpenConditionsMother.create(request.conditions),
      JobOpenResponsibilitiesMother.create(request.responsibilities),
      JobOpenQualificationMother.create(request.qualification),
      JobOpenPrevExperienceMother.create(request.prevExperience)
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
      JobOpenPrevExperienceMother.random()
    );
  }
}
