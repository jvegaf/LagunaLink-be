import { JobOpenQualification } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenQualification';
import { DegreeTitleMother } from '../../../Shared/domain/DegreeTitleMother';

export class JobOpenQualificationMother {
    static create(value: string): JobOpenQualification {
        return new JobOpenQualification(value);
    }

    static random(): JobOpenQualification {
        return this.create(DegreeTitleMother.random());
    }
}
