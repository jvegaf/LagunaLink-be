import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CourseId } from '../../../Shared/domain/Students/StudentId';
import { Student } from '../../domain/Student';
import { CourseRepository } from '../../domain/StudentRepository';

export class MongoCourseRepository extends MongoRepository<Student> implements CourseRepository {
  public save(course: Student): Promise<void> {
    return this.persist(course.id.value, course);
  }

  public async search(id: CourseId): Promise<Nullable<Student>> {
    const collection = await this.collection();

    const document = await collection.findOne({ _id: id.value });

    return document ? Student.fromPrimitives({ ...document, id: id.value }) : null;
  }

  protected moduleName(): string {
    return 'courses';
  }
}
