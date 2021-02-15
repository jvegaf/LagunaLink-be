import { Qualification } from '../../../../../src/Contexts/LLBE/Students/domain/Qualification';
import { TitleNameMother } from './TitleNameMother';
import { StartDateMother } from '../../Shared/domain/StartDateMother';
import { EndDateMother } from '../../Shared/domain/EndDateMother';

export class QualificationsMother {
    static create(value: Qualification): Qualification[] {
        const quals = [];
        quals.push(value);
        return quals;
    }

    static randomToPrimitives() {
        const quals = [];
        const qualification = this.createRandomQualification();
        quals.push(qualification.toPrimitives());
        return quals;
    }

    static random(): Qualification[] {
        const rndQualification = this.createRandomQualification();
        return this.create(rndQualification);
    }

    private static createRandomQualification() {
        return new Qualification(
          TitleNameMother.random(),
          StartDateMother.random(),
            EndDateMother.random()
        );
    }
}
