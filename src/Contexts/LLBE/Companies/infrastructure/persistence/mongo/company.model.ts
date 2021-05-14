import { Schema } from 'mongoose';

interface Company extends MongoDocument {
  name: string;
  description: string;
  address: string;
  postalCode: number;
  region: string;
  city: string;
}

const CompanySchemaFields: Record<keyof Company, any> = {
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  address: String,
  postalCode: Number,
  region: String,
  city: String
};

const CompanySchema = new Schema(CompanySchemaFields);

export { Company, CompanySchema };
