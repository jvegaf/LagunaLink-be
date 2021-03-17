import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type CompanyDocument = MongoDocument & {
  name: string;
  description: string;
  address: string;
  postalCode: number;
  region: string;
  city: string;
};
