import {JobOpenQualification} from "../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenQualification";
import {WordMother} from "../../../Shared/domain/WordMother";

export class JobOpenQualificationMother {
    static create(value: string): JobOpenQualification {
        return new JobOpenQualification(value);
    }

    static random(): JobOpenQualification {
        return this.create(WordMother.random());
    }
}
