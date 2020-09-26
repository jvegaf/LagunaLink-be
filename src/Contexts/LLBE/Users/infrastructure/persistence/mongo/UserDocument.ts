import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type UserDocument = MongoDocument & {
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  registered: boolean;
  createdAt: string;
  updatedAt: string;
};
