import { Schema } from 'mongoose';

interface User extends MongoDocument {
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  registered: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
}

const UserSchemaFields: Record<keyof User, any> = {
  _id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    index: true
  },
  password: String,
  isActive: Boolean,
  role: String,
  registered: Boolean,
  createdAt: Date,
  updatedAt: Date,
  avatar: String
};

const UserSchema = new Schema(UserSchemaFields);

export { UserSchema, User };
