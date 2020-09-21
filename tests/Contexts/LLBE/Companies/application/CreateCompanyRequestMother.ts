import { CompanyAddressMother } from '../domain/CompanyAddressMother';
import { CompanyCityMother } from '../domain/CompanyCityMother';
import { CompanyDescriptionMother } from '../domain/CompanyDescriptionMother';
import {CompanyId} from "../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId";
import {CompanyName} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyName";
import {CompanyDescription} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyDescription";
import {CompanyAddress} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyAddress";
import {CompanyPostalCode} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyPostalCode";
import {CompanyRegion} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyRegion";
import {CompanyCity} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyCity";
import {CreateCompanyRequest} from "../../../../../src/Contexts/LLBE/Companies/application/CreateCompanyRequest";
import {CompanyIdMother} from "../../Shared/domain/Companies/CompanyIdMother";
import {CompanyNameMother} from "../domain/CompanyNameMother";
import {CompanyPostalCodeMother} from "../domain/CompanyPostalCodeMother";
import {CompanyRegionMother} from "../domain/CompanyRegionMother";

export class CreateCompanyRequestMother {
  static create(
                id: CompanyId,
                name: CompanyName,
                description: CompanyDescription,
                address: CompanyAddress,
                postalCode: CompanyPostalCode,
                region: CompanyRegion,
                city: CompanyCity
  ): CreateCompanyRequest {
    return {
      id: id.value,
      name: name.value,
      description: description.value,
      address: address.value,
      postalCode: postalCode.value,
      region: region.value,
      city: city.value
    };
  }

  static random(): CreateCompanyRequest {
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
}
