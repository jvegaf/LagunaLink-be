import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { JobOpenResponsibilities } from './JobOpenResponsibilities';
import { JobOpenDescription } from './JobOpenDescription';
import { JobOpenConditions } from './JobOpenConditions';
import { JobOpenPosition } from './JobOpenPosition';
import { JobOpenPrevExperience } from './JobOpenPrevExperience';
import { JobOpenQualification } from './JobOpenQualification';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpenCreatedAt } from './JobOpenCreatedAt';
import { JobOpenHiringDate } from './JobOpenHiringDate';
import { JobOpeningDTO } from '../../Shared/domain/JobOpenings/JobOpeningDTO';
import { JobOpeningType } from '../../Shared/domain/JobOpenings/JobOpeningType';

export class JobOpening extends AggregateRoot {
  readonly id: JobOpeningId;
  readonly createdAt: JobOpenCreatedAt;
  readonly company: CompanyId;
  readonly description: JobOpenDescription;
  readonly position: JobOpenPosition;
  readonly conditions: JobOpenConditions;
  readonly responsibilities: JobOpenResponsibilities;
  readonly qualification: JobOpenQualification;
  readonly prevExperience: JobOpenPrevExperience;
  readonly hiringDate: JobOpenHiringDate;

  constructor(jobOpen: JobOpeningType) {
    super();
    this.id = jobOpen.id;
    this.createdAt = jobOpen.createdAt;
    this.company = jobOpen.company;
    this.description = jobOpen.description;
    this.position = jobOpen.position;
    this.conditions = jobOpen.conditions;
    this.responsibilities = jobOpen.responsibilities;
    this.qualification = jobOpen.qualification;
    this.prevExperience = jobOpen.prevExperience;
    this.hiringDate = jobOpen.hiringDate;
  }

  static create(data: JobOpeningType): JobOpening {
    return new JobOpening(data);
  }

  static fromPrimitives(plaindata: JobOpeningDTO) {
    return new JobOpening(
      {
        id: new JobOpeningId(plaindata.id),
        createdAt: new JobOpenCreatedAt(plaindata.createdAt),
        company: new CompanyId(plaindata.company),
        description: new JobOpenDescription(plaindata.description),
        position: new JobOpenPosition(plaindata.position),
        conditions: new JobOpenConditions(plaindata.conditions),
        responsibilities: new JobOpenResponsibilities(plaindata.responsibilities),
        qualification: new JobOpenQualification(plaindata.qualification),
        prevExperience: new JobOpenPrevExperience(plaindata.prevExperience),
        hiringDate: new JobOpenHiringDate(plaindata.hiringDate)
      }
    );
  }

  toPrimitives(): JobOpeningDTO {
    return {
      id: this.id.value,
      createdAt: this.createdAt.toString(),
      company: this.company.value,
      description: this.description.value,
      position: this.position.value,
      conditions: this.conditions.value,
      responsibilities: this.responsibilities.value,
      qualification: this.qualification.value,
      prevExperience: this.prevExperience.value,
      hiringDate: this.hiringDate.toString()
    };
  }

}
