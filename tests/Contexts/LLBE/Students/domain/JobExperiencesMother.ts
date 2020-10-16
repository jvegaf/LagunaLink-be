import { JobExperience } from '../../../../../src/Contexts/LLBE/Students/domain/JobExperience';
import { JobCompanyMother } from './JobCompanyMother';
import { JobPositionMother } from './JobPositionMother';
import { JobResponsMother } from './JobResponsMother';
import { StartDateMother } from '../../Shared/domain/StartDateMother';
import { EndDateMother } from '../../Shared/domain/EndDateMother';

export class JobExperiencesMother {
    // static create(value: JobExperience): JobExperience[] {
    //
    // }

    static random(): JobExperience[] {
        let jobs = [];
        for (let i = 0; i < 2; i++) {
            let job = this.createJobExperience()
            jobs.push(job);
        }
        return jobs;
    }


    private static createJobExperience() {
        return new JobExperience(
          JobCompanyMother.random(),
          JobPositionMother.random(),
          JobResponsMother.random(),
          StartDateMother.random(),
          EndDateMother.random()
        )
    }

    static randomToPrimitives() {
        let jobs = [];
        let job = this.createJobExperience();
        jobs.push(job.toPrimitives());
        return jobs;
    }
}
