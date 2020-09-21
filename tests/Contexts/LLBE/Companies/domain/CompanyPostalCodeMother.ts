import {CompanyPostalCode} from "../../../../../src/Contexts/LLBE/Companies/domain/CompanyPostalCode";
import {PostalCodeMother} from "../../../Shared/domain/PostalCodeMother";

export class CompanyPostalCodeMother {
    static create(value: number): CompanyPostalCode {
        return new CompanyPostalCode(value);
    }

    static random(): CompanyPostalCode {
        return this.create(PostalCodeMother.random());
    }
}
