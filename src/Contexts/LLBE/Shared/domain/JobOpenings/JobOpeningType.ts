import { JobOpeningId } from './JobOpeningId';
import { JobOpenCreatedAt } from '../../../JobOpenings/domain/JobOpenCreatedAt';
import { CompanyId } from '../Companies/CompanyId';
import { JobOpenDescription } from '../../../JobOpenings/domain/JobOpenDescription';
import { JobOpenPosition } from '../../../JobOpenings/domain/JobOpenPosition';
import { JobOpenConditions } from '../../../JobOpenings/domain/JobOpenConditions';
import { JobOpenResponsibilities } from '../../../JobOpenings/domain/JobOpenResponsibilities';
import { JobOpenQualification } from '../../../JobOpenings/domain/JobOpenQualification';
import { JobOpenPrevExperience } from '../../../JobOpenings/domain/JobOpenPrevExperience';
import { JobOpenHiringDate } from '../../../JobOpenings/domain/JobOpenHiringDate';
import { JobOpenIsActive } from '../../../JobOpenings/domain/JobOpenIsActive';

export type JobOpeningType = {
  id: JobOpeningId;
  createdAt: JobOpenCreatedAt;
  company: CompanyId;
  description: JobOpenDescription;
  position: JobOpenPosition;
  conditions: JobOpenConditions;
  responsibilities: JobOpenResponsibilities;
  qualification: JobOpenQualification;
  prevExperience: JobOpenPrevExperience;
  hiringDate: JobOpenHiringDate;
  isActive: JobOpenIsActive;
};
