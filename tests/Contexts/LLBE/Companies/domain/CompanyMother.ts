import { CompanyId } from '../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';
import { CompanyName } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyName';
import { CompanyDescription } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyDescription';
import { CompanyAddress } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyAddress';
import { CompanyPostalCode } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyPostalCode';
import { CompanyRegion } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyRegion';
import { CompanyCity } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyCity';
import { Company } from '../../../../../src/Contexts/LLBE/Companies/domain/Company';
import { CompanyRequest } from '../../../../../src/Contexts/LLBE/Companies/application/CompanyRequest';
import { CompanyIdMother } from '../../Shared/domain/Companies/CompanyIdMother';
import { CompanyNameMother } from './CompanyNameMother';
import { CompanyDescriptionMother } from './CompanyDescriptionMother';
import { CompanyAddressMother } from './CompanyAddressMother';
import { CompanyPostalCodeMother } from './CompanyPostalCodeMother';
import { CompanyRegionMother } from './CompanyRegionMother';
import { CompanyCityMother } from './CompanyCityMother';

export class CompanyMother {
  static create(
    id: CompanyId,
    name: CompanyName,
    description: CompanyDescription,
    address: CompanyAddress,
    postalCode: CompanyPostalCode,
    region: CompanyRegion,
    city: CompanyCity
  ): Company {
    return new Company(
      id,
      name,
      description,
      address,
      postalCode,
      region,
      city
    );
  }

  static fromRequest(request: CompanyRequest): Company {
    return this.create(
      CompanyIdMother.create(request.id),
      CompanyNameMother.create(request.name),
      CompanyDescriptionMother.create(request.description),
      CompanyAddressMother.create(request.address),
      CompanyPostalCodeMother.create(request.postalCode),
      CompanyRegionMother.create(request.region),
      CompanyCityMother.create(request.city)
    );
  }

  static random(): Company {
    return this.create(
      CompanyIdMother.random(),
      CompanyNameMother.random(),
      CompanyDescriptionMother.random(),
      CompanyAddressMother.random(),
      CompanyPostalCodeMother.random(),
      CompanyRegionMother.random(),
      CompanyCityMother.random()
    );
  }

  static fromCreateRequest(request: CompanyRequest): Company {
    return this.create(
      CompanyIdMother.create(request.id),
      CompanyNameMother.create(request.name),
      CompanyDescriptionMother.create(request.description),
      CompanyAddressMother.create(request.address),
      CompanyPostalCodeMother.create(request.postalCode),
      CompanyRegionMother.create(request.region),
      CompanyCityMother.create(request.city)
    );
  }
}
