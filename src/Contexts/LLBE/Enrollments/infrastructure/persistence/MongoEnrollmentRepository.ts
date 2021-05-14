import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Enrollment as MongoEnrollment, EnrollmentSchema } from './mongo/enrollment.model';
import { Schema } from 'mongoose';
import { EnrollmentRepository } from '../../domain/EnrollmentRepository';
import { Enrollment } from '../../domain/Enrollment';
import { EnrollmentId } from '../../../Shared/domain/Enrollments/EnrollmentId';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { StudentId } from '../../../Shared/domain/Students/StudentId';

export class MongoEnrollmentRepository extends MongoRepository<MongoEnrollment> implements EnrollmentRepository {
  public async fetchByJobOpening(jobId: JobOpeningId): Promise<Enrollment[]> {
    const model = await this.model();
    const cursor = await model.find({job_opening: jobId.value});
    return cursor.map(document => Enrollment.fromPrimitives({
      ...document,
      student: document.student as string,
      job_opening: document.job_opening as string,
      id: document._id
    }));
  }

  public save(enrollment: Enrollment): Promise<void> {
    return this.persist(
      enrollment.id.value, enrollment);
  }

  public async search(id: EnrollmentId): Promise<Nullable<Enrollment>> {
    const model = await this.model();

    const document = await model.findOne({_id: id.value});

    return document ? Enrollment.fromPrimitives({
      ...document,
      student: document.student as string,
      job_opening: document.job_opening as string,
      id: document._id
    }) : null;
  }

  public async remove(id: EnrollmentId): Promise<void> {
    return this.delete(id.value);
  }

  public async fetch(): Promise<Array<Enrollment>> {
    const model = await this.model();
    const cursor = await model.find();
    return cursor.map(document => Enrollment.fromPrimitives({
      ...document,
      student: document.student as string,
      job_opening: document.job_opening as string,
      id: document._id
    }));
  }

  public async fetchByStudent(studentId: StudentId): Promise<Array<Enrollment>> {
    const model = await this.model();
    const cursor = await model.find({student: studentId.value});
    return cursor.map(document => Enrollment.fromPrimitives({
      ...document,
      student: document.student as string,
      job_opening: document.job_opening as string,
      id: document._id
    }));
  }

  protected schema(): Schema {
    return EnrollmentSchema;
  }

  protected moduleName(): string {
    return 'Enrollment';
  }
}
