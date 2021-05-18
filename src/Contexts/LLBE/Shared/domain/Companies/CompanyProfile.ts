import { Company } from '../../../Companies/domain/Company';
import { JobOpening } from '../../../JobOpenings/domain/JobOpening';
import { CompanyProfileType } from './CompanyProfileType';
import { CompanyProfileDTO } from './CompanyProfileDTO';
import { CompanyId } from './CompanyId';
import { CompanyName } from '../../../Companies/domain/CompanyName';
import { CompanyDescription } from '../../../Companies/domain/CompanyDescription';
import { CompanyAddress } from '../../../Companies/domain/CompanyAddress';
import { CompanyPostalCode } from '../../../Companies/domain/CompanyPostalCode';
import { CompanyRegion } from '../../../Companies/domain/CompanyRegion';
import { CompanyCity } from '../../../Companies/domain/CompanyCity';

export class CompanyProfile extends Company {
  readonly jobOpenings: JobOpening[];

  constructor(values: CompanyProfileType) {
    super(values);
    this.jobOpenings = values.jobOpenings;
  }

  static fromPrimitives(data: CompanyProfileDTO) {
    return new CompanyProfile(
      {
        id: new CompanyId(data.id),
        name: new CompanyName(data.name),
        description: new CompanyDescription(data.description),
        address: new CompanyAddress(data.address),
        postalCode: new CompanyPostalCode(data.postalCode),
        region: new CompanyRegion(data.region),
        city: new CompanyCity(data.city),
        jobOpenings: data.jobOpenings.map(j => JobOpening.fromPrimitives(j))
      }
    );
  }

  toPrimitives(): CompanyProfileDTO {
    return {...(super.toPrimitives()), jobOpenings: this.jobOpenings.map(j => j.toPrimitives())};
  }
}
