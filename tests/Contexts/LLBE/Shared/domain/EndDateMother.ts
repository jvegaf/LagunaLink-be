import { EndDate } from '../../../../../src/Contexts/LLBE/Shared/domain/EndDate';
import { DateMother } from '../../../Shared/domain/DateMother';

// TODO: FIX the end date maybe later than start date
export class EndDateMother {
    static create(value: string): EndDate {
        return new EndDate(value);
    }

    static random(): EndDate {
        return this.create(DateMother.random().toISOString().substr(0, 7));
    }
}
