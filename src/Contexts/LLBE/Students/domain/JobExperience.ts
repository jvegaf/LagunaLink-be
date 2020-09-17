import {StartDate} from "../../Shared/domain/StartDate";
import {EndDate} from "../../Shared/domain/EndDate";

export class JobExperience {
    readonly company: string;
    readonly position: string;
    readonly responsibilities: string;
    readonly startDate: StartDate;
    readonly endDate: EndDate;


    static fromPrimitives(plaindata: {
        company: string,
        position: string,
        responsibilities: string,
        startDate: string,
        enddate: string}) {
        return new JobExperience(
            plaindata.company,
            plaindata.position,
            plaindata.responsibilities,
            new StartDate(plaindata.startDate),
            new EndDate(plaindata.enddate)
        );
    }

    constructor(company: string, position: string, responsibilities: string, startDate: StartDate, endDate: EndDate) {
        this.company = company;
        this.position = position;
        this.responsibilities = responsibilities;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    toPrimitives() {
        return {
            company: this.company,
            position: this.position,
            responsibilities: this.responsibilities,
            startDate: this.startDate.toString(),
            enddate: this.endDate.toString()
        };
    }
}
