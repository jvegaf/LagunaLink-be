import { Nullable } from '../../../Shared/domain/Nullable';
import { JobOpening } from './JobOpening';
import {JobOpeningId} from "../../Shared/domain/JobOpenings/JobOpeningId";

export interface JobOpeningRepository {
  save(jobOpening:  JobOpening): Promise<void>;

  search(id: JobOpeningId): Promise<Nullable<JobOpening>>;
}
