import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type StudentDocument = MongoDocument & {
  name: string;
  duration: string;
};
