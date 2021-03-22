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

export class JobOpening extends AggregateRoot {
  readonly id: JobOpeningId;
  readonly createdAt: JobOpenCreatedAt;
  readonly company: CompanyId;
  readonly title: JobOpenDescription;
  readonly position: JobOpenPosition;
  readonly conditions: JobOpenConditions;
  readonly responsibilities: JobOpenResponsibilities;
  readonly qualification: JobOpenQualification;
  readonly prevExperience: JobOpenPrevExperience;

  constructor(
    id: JobOpeningId,
    createdAt: JobOpenCreatedAt,
    company: CompanyId,
    title: JobOpenDescription,
    position: JobOpenPosition,
    conditions: JobOpenConditions,
    responsibilities: JobOpenResponsibilities,
    qualification: JobOpenQualification,
    prevExperience: JobOpenPrevExperience
  ) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.company = company;
    this.title = title;
    this.position = position;
    this.conditions = conditions;
    this.responsibilities = responsibilities;
    this.qualification = qualification;
    this.prevExperience = prevExperience;
  }

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

  static fromPrimitives(
    plaindata: {
      id: string;
      createdAt: string;
      company: string;
      title: string;
      position: string;
      conditions: string;
      responsibilities: string;
      qualification: string;
      prevExperience: string;
    }) {
    return new JobOpening(
      new JobOpeningId(plaindata.id),
      new JobOpenCreatedAt(plaindata.createdAt),
      new CompanyId(plaindata.company),
      new JobOpenDescription(plaindata.title),
      new JobOpenPosition(plaindata.position),
      new JobOpenConditions(plaindata.conditions),
      new JobOpenResponsibilities(plaindata.responsibilities),
      new JobOpenQualification(plaindata.qualification),
      new JobOpenPrevExperience(plaindata.prevExperience)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      createdAt: this.createdAt.toString(),
      company: this.company.value,
      title: this.title.value,
      position: this.position.value,
      conditions: this.conditions.value,
      responsibilities: this.responsibilities.value,
      qualification: this.qualification.value,
      prevExperience: this.prevExperience.value
    };
  }

}
