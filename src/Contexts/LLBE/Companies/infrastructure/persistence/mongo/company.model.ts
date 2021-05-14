import { Schema } from 'mongoose';
import { JobOpening } from '../../../../JobOpenings/infrastructure/persistence/mongo/jobOpening.model';

interface Company extends MongoDocument {
  name: string;
  description: string;
  address: string;
  postalCode: number;
  region: string;
  city: string;
  job_openings: undefined | JobOpening[];
}

const CompanySchemaFields: Record<keyof Company, any> = {
  _id: Schema.Types.ObjectId,
  name: String,
  description: String,
  address: String,
  postalCode: Number,
  region: String,
  city: String,
  job_openings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'JobOpening'
    }
  ]
};

const CompanySchema = new Schema(CompanySchemaFields);

export { Company, CompanySchema };
