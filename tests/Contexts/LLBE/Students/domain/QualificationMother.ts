import { Qualification } from '../../../../../src/Contexts/LLBE/Students/domain/Qualification';
import { TitleNameMother } from './TitleNameMother';
import { StartDateMother } from '../../Shared/domain/StartDateMother';
import { EndDateMother } from '../../Shared/domain/EndDateMother';

export class QualificationMother {
    static create(value: Qualification): Qualification {
        return value;
    }

    static random(): Qualification {
        return new Qualification(
          TitleNameMother.random(),
          StartDateMother.random(),
          EndDateMother.random()
        );
    }
}
