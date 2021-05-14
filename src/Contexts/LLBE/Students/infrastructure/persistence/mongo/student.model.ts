import { Schema } from 'mongoose';
import { Language } from './language';
import { Qualification } from './qualification';
import { JobExperience } from './jobExperience';

interface Student extends MongoDocument {
  name: string;
  surname: string;
  lastname: string;
  qualification: Qualification;
  languages: [Language];
  job_experiences: [JobExperience];
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
  ]
};

const StudentSchema = new Schema(StudentSchemaFields);

export { StudentSchema, Student };
