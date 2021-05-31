import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type JobOpeningDocument = MongoDocument & {
  company: string;
  title: string;
  position: string;
  conditions: string;
  responsibilities: string;
  qualification: string;
  prevExperience: string;
  hiringDate: string;
  isActive: boolean;
};
