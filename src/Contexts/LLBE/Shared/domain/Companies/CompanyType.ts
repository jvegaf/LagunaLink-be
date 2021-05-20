import { CompanyId } from './CompanyId';
import { CompanyName } from '../../../Companies/domain/CompanyName';
import { CompanyDescription } from '../../../Companies/domain/CompanyDescription';
import { CompanyAddress } from '../../../Companies/domain/CompanyAddress';
import { CompanyPostalCode } from '../../../Companies/domain/CompanyPostalCode';
import { CompanyRegion } from '../../../Companies/domain/CompanyRegion';
import { CompanyCity } from '../../../Companies/domain/CompanyCity';

export type CompanyType = {
  id: CompanyId;
  name: CompanyName;
  description: CompanyDescription;
  address: CompanyAddress;
  postalCode: CompanyPostalCode;
  region: CompanyRegion;
  city: CompanyCity;
};
