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

  constructor(
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
  ) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.company = company;
    this.description = description;
    this.position = position;
    this.conditions = conditions;
    this.responsibilities = responsibilities;
    this.qualification = qualification;
    this.prevExperience = prevExperience;
    this.hiringDate = hiringDate;
  }

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
    return new JobOpening(
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
    );
  }

  static fromPrimitives(
    plaindata: {
      id: string;
      createdAt: string;
      company: string;
      description: string;
      position: string;
      conditions: string;
      responsibilities: string;
      qualification: string;
      prevExperience: string;
      hiringDate: string;
    }) {
    return new JobOpening(
      new JobOpeningId(plaindata.id),
      new JobOpenCreatedAt(plaindata.createdAt),
      new CompanyId(plaindata.company),
      new JobOpenDescription(plaindata.description),
      new JobOpenPosition(plaindata.position),
      new JobOpenConditions(plaindata.conditions),
      new JobOpenResponsibilities(plaindata.responsibilities),
      new JobOpenQualification(plaindata.qualification),
      new JobOpenPrevExperience(plaindata.prevExperience),
      new JobOpenHiringDate(plaindata.hiringDate)
    );
  }

  toPrimitives(): any {
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
      hiringDate: this.hiringDate.toISOString()
    };
  }

}
