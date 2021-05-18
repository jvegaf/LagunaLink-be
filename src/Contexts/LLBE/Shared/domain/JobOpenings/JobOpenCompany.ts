import { JobOpening } from '../../../JobOpenings/domain/JobOpening';
import { Company } from '../../../Companies/domain/Company';
import { JobOpenCompanyType } from './JobOpenCompanyType';
import { JobOpenCompanyDTO } from './JobOpenCompanyDTO';
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

export class JobOpenCompany extends JobOpening {
  companyDetail: Company;

  constructor(values: JobOpenCompanyType) {
    super(values);
    this.companyDetail = values.companyDetail;
  }

  static fromPrimitives(plaindata: JobOpenCompanyDTO) {
    return new JobOpenCompany({
      id: new JobOpeningId(plaindata.id),
      createdAt: new JobOpenCreatedAt(plaindata.createdAt),
      company: new CompanyId(plaindata.company),
      description: new JobOpenDescription(plaindata.description),
      position: new JobOpenPosition(plaindata.position),
      conditions: new JobOpenConditions(plaindata.conditions),
      responsibilities: new JobOpenResponsibilities(plaindata.responsibilities),
      qualification: new JobOpenQualification(plaindata.qualification),
      prevExperience: new JobOpenPrevExperience(plaindata.prevExperience),
      hiringDate: new JobOpenHiringDate(plaindata.hiringDate),
      companyDetail: Company.fromPrimitives(plaindata.companyDetail)
    });
  }

  toPrimitives(): JobOpenCompanyDTO {
    return {...(super.toPrimitives()), companyDetail: this.companyDetail.toPrimitives()};
  }
}
