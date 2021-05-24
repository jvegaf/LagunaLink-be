import { MongoDocument } from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type UserDocument = MongoDocument & {
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
