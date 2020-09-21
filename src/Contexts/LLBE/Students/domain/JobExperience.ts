import {StartDate} from "../../Shared/domain/StartDate";
import {EndDate} from "../../Shared/domain/EndDate";
import {JobOpenCompany} from "./JobOpenCompany";
import {JobPosition} from "./JobPosition";
import {JobRespons} from "./JobRespons";

export class JobExperience {
    readonly company: JobOpenCompany;
    readonly position: JobPosition;
    readonly responsibilities: JobRespons;
    readonly startDate: StartDate;
    readonly endDate: EndDate;

    constructor(company: JobOpenCompany, position: JobPosition, responsibilities: JobRespons, startDate: StartDate, endDate: EndDate) {
        this.company = company;
        this.position = position;
        this.responsibilities = responsibilities;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    static fromPrimitives(plaindata: {
        company: string,
        position: string,
        responsibilities: string,
        startDate: string,
        endDate: string
    }) {
        return new JobExperience(
            new JobOpenCompany(plaindata.company),
            new JobPosition(plaindata.position),
            new JobRespons(plaindata.responsibilities),
            new StartDate(plaindata.startDate),
            new EndDate(plaindata.endDate)
        );
    }

    toPrimitives() {
        return {
            company: this.company.toString(),
            position: this.position.toString(),
            responsibilities: this.responsibilities.toString(),
            startDate: this.startDate.toString(),
            endDate: this.endDate.toString()
        };
    }
}
