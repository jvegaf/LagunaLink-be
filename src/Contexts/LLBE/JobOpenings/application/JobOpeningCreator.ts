import {JobOpeningRepository} from "../domain/JobOpeningRepository";
import {CreateJobOpeningRequest} from "./CreateJobOpeningRequest";
import {JobOpening} from "../domain/JobOpening";
import {CompanyId} from "../../Shared/domain/Companies/CompanyId";
import {JobOpenResponsibilities} from "../domain/JobOpenResponsibilities";
import {JobOpenPrevExperience} from "../domain/JobOpenPrevExperience";
import {JobOpenQualification} from "../domain/JobOpenQualification";
import {JobOpenPosition} from "../domain/JobOpenPosition";
import {JobOpenConditions} from "../domain/JobOpenConditions";
import {JobOpenTitle} from "../domain/JobOpenTitle";
import {JobOpeningId} from "../../Shared/domain/JobOpenings/JobOpeningId";

export class JobOpeningCreator {
    private repository: JobOpeningRepository;

    constructor(repository: JobOpeningRepository) {
        this.repository = repository;
    }

    async run(request: CreateJobOpeningRequest): Promise<void> {
        const jobOpening = JobOpening.create(
            new JobOpeningId(request.id),
            new CompanyId(request.company),
            new JobOpenTitle(request.title),
            new JobOpenPosition(request.position),
            new JobOpenConditions(request.conditions),
            new JobOpenResponsibilities(request.responsibilities),
            new JobOpenQualification(request.qualification),
            new JobOpenPrevExperience(request.prevExperience)
        );

        await this.repository.save(jobOpening);
    }
}
