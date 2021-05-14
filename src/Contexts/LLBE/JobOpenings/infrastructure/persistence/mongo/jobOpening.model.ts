import { Schema } from 'mongoose';
import { Company } from '../../../../Companies/infrastructure/persistence/mongo/company.model';
import { Enrollment } from '../../../../Enrollments/infrastructure/persistence/mongo/enrollment.model';

interface JobOpening extends MongoDocument {
  createdAt: Date;
  company: string | Company;
  description: string;
  position: string;
  conditions: string;
  responsibilities: string;
  qualification: string;
  prevExperience: string;
  hiringDate: Date;
  enrollments: undefined | Enrollment[];
}

const JobOpeningSchemaFields: Record<keyof JobOpening, any> = {
  _id: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  createdAt: Date,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  description: String,
  position: String,
  conditions: String,
  responsibilities: String,
  qualification: String,
  prevExperience: String,
  hiringDate: Date,
  enrollments: {
    type: Schema.Types.ObjectId,
    ref: 'Enrollment'
  }
};

const JobOpeningSchema = new Schema(JobOpeningSchemaFields);

export { JobOpeningSchema, JobOpening };
