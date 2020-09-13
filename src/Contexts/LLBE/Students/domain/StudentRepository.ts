import { Nullable } from '../../../Shared/domain/Nullable';
import { Student } from './Student';
import { CourseId } from '../../Shared/domain/Students/StudentId';

export interface StudentRepository {
  save(student:  Student): Promise<void>;

  search(id: StudentId): Promise<Nullable<Student>>;
}
