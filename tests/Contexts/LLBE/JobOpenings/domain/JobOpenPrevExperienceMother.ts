import { JobOpenPrevExperience } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPrevExperience';
import { WordMother } from '../../../Shared/domain/WordMother';

export class JobOpenPrevExperienceMother {
    static create(value: string): JobOpenPrevExperience {
        return new JobOpenPrevExperience(value);
    }

    static random(): JobOpenPrevExperience {
        return this.create(WordMother.random());
    }
}
