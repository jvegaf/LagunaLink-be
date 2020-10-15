import {Qualification} from "../../../../../src/Contexts/LLBE/Students/domain/Qualification";
import {TitleNameMother} from "./TitleNameMother";
import {StartDateMother} from "../../Shared/domain/StartDateMother";
import {EndDateMother} from "../../Shared/domain/EndDateMother";

export class QualificationsMother {
    static create(value: Qualification): Qualification[] {
        let quals = [];
        quals.push(value);
        return quals;
    }

    static randomToPrimitives() {
        let quals = [];
        let qualification = this.createRandomQualification();
        quals.push(qualification.toPrimitives());
        return quals;
    }

    static random(): Qualification[] {
        let rndQualification = this.createRandomQualification();
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
