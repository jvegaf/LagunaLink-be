import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';
import { JobExperienceDocument } from './JobExperienceDocument';
import { QualificationDocument } from './QualificationDocument';
import { LanguageDocument } from './LanguageDocument';

export type StudentDocument = MongoDocument & {
    name: string;
    surname: string;
    lastname: string;
    qualification: QualificationDocument;
    languages: Array<LanguageDocument>;
    job_experiences: Array<JobExperienceDocument>;
};
