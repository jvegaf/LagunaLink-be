import {StartDate} from "../../Shared/domain/StartDate";
import {EndDate} from "../../Shared/domain/EndDate";
import {JobCompany} from "./JobCompany";
import {JobPosition} from "./JobPosition";
import {JobRespons} from "./JobRespons";

export class JobExperience {
    readonly company: JobCompany;
    readonly position: JobPosition;
    readonly responsibilities: JobRespons;
    readonly startDate: StartDate;
    readonly endDate: EndDate;


    static fromPrimitives(plaindata: {
        company: string,
        position: string,
        responsibilities: string,
        startDate: string,
        enddate: string}) {
        return new JobExperience(
            new JobCompany(plaindata.company),
            new JobPosition(plaindata.position),
            new JobRespons(plaindata.responsibilities),
            new StartDate(plaindata.startDate),
            new EndDate(plaindata.enddate)
        );
    }

    constructor(company: JobCompany, position: JobPosition, responsibilities: JobRespons, startDate: StartDate, endDate: EndDate) {
        this.company = company;
        this.position = position;
        this.responsibilities = responsibilities;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    toPrimitives() {
        return {
            company: this.company.value,
            position: this.position.value,
            responsibilities: this.responsibilities.value,
            startDate: this.startDate.toString(),
            enddate: this.endDate.toString()
        };
    }
}
