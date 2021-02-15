import { CompanyCity } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyCity';
import { CityMother } from '../../../Shared/domain/CityMother';

export class CompanyCityMother {
  static create(value: string): CompanyCity {
    return new CompanyCity(value);
  }

  static random(): CompanyCity {
    return this.create(CityMother.random());
  }
}
