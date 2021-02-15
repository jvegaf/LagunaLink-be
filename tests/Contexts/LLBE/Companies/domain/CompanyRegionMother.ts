import { CompanyRegion } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyRegion';
import { RegionMother } from '../../../Shared/domain/RegionMother';

export class CompanyRegionMother {
  static create(value: string): CompanyRegion {
    return new CompanyRegion(value);
  }

  static random(): CompanyRegion {
    return this.create(RegionMother.random());
  }
}
