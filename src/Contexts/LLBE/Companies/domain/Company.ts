import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { CompanyName } from './CompanyName';
import { CompanyDescription } from './CompanyDescription';
import { CompanyAddress } from './CompanyAddress';
import { CompanyPostalCode } from './CompanyPostalCode';
import { CompanyCity } from './CompanyCity';
import { CompanyRegion } from './CompanyRegion';
import { CompanyDTO } from '../../Shared/domain/Companies/CompanyDTO';
import { CompanyType } from '../../Shared/domain/Companies/CompanyType';

export class Company extends AggregateRoot {
  readonly id: CompanyId;
  readonly name: CompanyName;
  readonly description: CompanyDescription;
  readonly address: CompanyAddress;
  readonly postalCode: CompanyPostalCode;
  readonly region: CompanyRegion;
  readonly city: CompanyCity;

  constructor(company: CompanyType) {
    super();
    this.id = company.id;
    this.name = company.name;
    this.description = company.description;
    this.address = company.address;
    this.postalCode = company.postalCode;
    this.region = company.region;
    this.city = company.city;
  }

  static create(company: CompanyType): Company {
    return new Company(company);
  }

  static fromPrimitives(plaindata: CompanyDTO) {
    return new Company({
      id: new CompanyId(plaindata.id),
      name: new CompanyName(plaindata.name),
      description: new CompanyDescription(plaindata.description),
      address: new CompanyAddress(plaindata.address),
      postalCode: new CompanyPostalCode(plaindata.postalCode),
      region: new CompanyRegion(plaindata.region),
      city: new CompanyCity(plaindata.city),
    });
  }

  toPrimitives(): CompanyDTO {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      address: this.address.value,
      postalCode: this.postalCode.value,
      region: this.region.value,
      city: this.city.value,
    };
  }
}
