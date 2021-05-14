import { Schema } from 'mongoose';
import { Language } from './language';
import { Qualification } from './qualification';
import { JobExperience } from './jobExperience';
import { Enrollment } from '../../../../Enrollments/infrastructure/persistence/mongo/enrollment.model';

interface Student extends MongoDocument {
  name: string;
  surname: string;
  lastname: string;
  qualification: Qualification;
  languages: [Language];
  job_experiences: [JobExperience];
  enrollments: undefined | Enrollment[];
}

const StudentSchemaFields: Record<keyof Student, any> = {
  _id: {
    type: String,
    unique: true
  },
  name: String,
  surname: String,
  lastname: String,
  qualification: {
    title: String,
    start_date: Date,
    end_date: Date
  },
  languages: [
    {
      name: String,
      speak: Number,
      write: Number,
    }
  ],
  job_experiences: [
    {
      company: String,
      position: String,
      responsibilities: String,
      start_date: Date,
      end_date: Date
    }
  ],
  enrollments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Enrollment'
    }
  ]
};

const StudentSchema = new Schema(StudentSchemaFields);

export { StudentSchema, Student };
