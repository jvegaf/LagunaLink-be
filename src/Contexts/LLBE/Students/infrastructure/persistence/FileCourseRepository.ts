import { CourseRepository } from '../../domain/StudentRepository';
import { Student } from '../../domain/Student';
import fs from 'fs';
import BSON from 'bson';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { CourseId } from '../../../Shared/domain/Students/StudentId';

export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  async save(course: Student): Promise<void> {
    const filePath = this.filePath(course.id.value);
    const data = BSON.serialize(course);

    return fs.writeFileSync(filePath, data);
  }

  async search(id: CourseId): Promise<Nullable<Student>> {
    const filePath = this.filePath(id.value);
    const exists = fs.existsSync(filePath);

    return exists ? BSON.deserialize(fs.readFileSync(this.filePath(id.value))) : null;
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
