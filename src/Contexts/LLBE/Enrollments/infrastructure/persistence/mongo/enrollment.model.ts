import { Schema } from 'mongoose';
import { JobOpening } from '../../../../JobOpenings/infrastructure/persistence/mongo/jobOpening.model';
import { Student } from '../../../../Students/infrastructure/persistence/mongo/student.model';

interface Enrollment extends MongoDocument {
  student: string | Student;
  job_opening: string | JobOpening;
  enrollment_date: Date;
}

const EnrollmentSchemaFields: Record<keyof Enrollment, any> = {
  _id: {
    type: Schema.Types.ObjectId,
    unique: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  job_opening: {
    type: Schema.Types.ObjectId,
    ref: 'JobOpening'
  },
  enrollment_date: Date
};

const EnrollmentSchema = new Schema(EnrollmentSchemaFields);

export { EnrollmentSchema, Enrollment };
