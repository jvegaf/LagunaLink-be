import { JobOpening } from '../../../JobOpenings/domain/JobOpening';
import { EnrollStudent } from '../Enrollments/EnrollStudent';
import { JobOpenEnrollsType } from './JobOpenEnrollsType';
import { JobOpenEnrollsDTO } from './JobOpenEnrollsDTO';
import { JobOpeningId } from './JobOpeningId';
import { JobOpenConditions } from '../../../JobOpenings/domain/JobOpenConditions';
import { CompanyId } from '../Companies/CompanyId';
import { JobOpenCreatedAt } from '../../../JobOpenings/domain/JobOpenCreatedAt';
import { JobOpenDescription } from '../../../JobOpenings/domain/JobOpenDescription';
import { JobOpenHiringDate } from '../../../JobOpenings/domain/JobOpenHiringDate';
import { JobOpenPrevExperience } from '../../../JobOpenings/domain/JobOpenPrevExperience';
import { JobOpenPosition } from '../../../JobOpenings/domain/JobOpenPosition';
import { JobOpenQualification } from '../../../JobOpenings/domain/JobOpenQualification';
import { JobOpenResponsibilities } from '../../../JobOpenings/domain/JobOpenResponsibilities';

export class JobOpenEnrolls extends JobOpening {
  readonly enrolls: EnrollStudent[];

  constructor(values: JobOpenEnrollsType) {
    super(values);
    this.enrolls = values.enrolls;
  }

  static fromPrimitives(data: JobOpenEnrollsDTO) {
    return new JobOpenEnrolls({
      id: new JobOpeningId(data.id),
      company: new CompanyId(data.company),
      conditions: new JobOpenConditions(data.conditions),
      createdAt: new JobOpenCreatedAt(data.createdAt),
      description: new JobOpenDescription(data.description),
      enrolls: data.enrolls.map(en => EnrollStudent.fromPrimitives(en)),
      hiringDate: new JobOpenHiringDate(data.hiringDate),
      position: new JobOpenPosition(data.position),
      prevExperience: new JobOpenPrevExperience(data.prevExperience),
      qualification: new JobOpenQualification(data.qualification),
      responsibilities: new JobOpenResponsibilities(data.responsibilities)
    });
  }
}
