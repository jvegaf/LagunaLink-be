import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CompanyId } from '../../Shared/domain/Companies/CompanyId';
import { CompanyName } from './CompanyName';
import { CompanyDescription } from './CompanyDescription';
import { CompanyAddress } from './CompanyAddress';
import { CompanyPostalCode } from './CompanyPostalCode';
import { CompanyCity } from './CompanyCity';
import { CompanyRegion } from './CompanyRegion';

export class Company extends AggregateRoot {
  readonly id: CompanyId;
  readonly name: CompanyName;
  readonly description: CompanyDescription;
  readonly address: CompanyAddress;
  readonly postalCode: CompanyPostalCode;
  readonly region: CompanyRegion;
  readonly city: CompanyCity;

  constructor(
    id: CompanyId,
    name: CompanyName,
    description: CompanyDescription,
    address: CompanyAddress,
    postalCode: CompanyPostalCode,
    region: CompanyRegion,
    city: CompanyCity
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.address = address;
    this.postalCode = postalCode;
    this.region = region;
    this.city = city;
  }

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

  static fromPrimitives(
    plaindata: {
      id: string;
      name: string;
      description: string;
      address: string;
      postalCode: number;
      region: string;
      city: string;
    }) {
    return new Company(
      new CompanyId(plaindata.id),
      new CompanyName(plaindata.name),
      new CompanyDescription(plaindata.description),
      new CompanyAddress(plaindata.address),
      new CompanyPostalCode(plaindata.postalCode),
      new CompanyRegion(plaindata.region),
      new CompanyCity(plaindata.city)
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      address: this.address.value,
      postalCode: this.postalCode.value,
      region: this.region.value,
      city: this.city.value
    };
  }

}
