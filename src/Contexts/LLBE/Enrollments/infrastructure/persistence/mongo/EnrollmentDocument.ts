import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type EnrollmentDocument = MongoDocument & {
  student: string;
  job_opening: string;
  enrollment_date: string;
};
