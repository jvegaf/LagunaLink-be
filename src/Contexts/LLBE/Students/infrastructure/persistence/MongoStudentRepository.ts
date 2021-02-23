import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { StudentId } from '../../../Shared/domain/Students/StudentId';
import { Student } from '../../domain/Student';
import { StudentRepository } from '../../domain/StudentRepository';

export class MongoStudentRepository extends MongoRepository<Student> implements StudentRepository {
  public save(student: Student): Promise<void> {
    return this.persist(
      student.id.value, student);
  }

  public async search(id: StudentId): Promise<Nullable<Student>> {
    const collection = await this.collection();

    const document = await collection.findOne({ _id: id.value });

    return document ? Student.fromPrimitives({...document, id: id.value}) : null;
  }

  protected moduleName(): string {
    return 'students';
  }
}
