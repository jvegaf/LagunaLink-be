import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { StudentId } from '../../../Shared/domain/Students/StudentId';
import { StudentRepository } from '../../domain/StudentRepository';
import { Student as MongoStudent, StudentSchema } from './mongo/student.model';
import { Student } from '../../domain/Student';
import { Schema } from 'mongoose';

export class MongoStudentRepository extends MongoRepository<MongoStudent> implements StudentRepository {
  public save(student: Student): Promise<void> {
    return this.persist(
      student.id.value, student);
  }

  public async search(id: StudentId): Promise<Nullable<Student>> {
    const model = await this.model();

    const document = await model.findOne({ _id: id.value }).exec();

    return document ? Student.fromPrimitives({...document, id: document._id}) : null;
  }

  protected moduleName(): string {
    return 'Student';
  }

  protected schema(): Schema {
    return StudentSchema;
  }

}
