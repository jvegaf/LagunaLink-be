import { Nullable } from '../../../Shared/domain/Nullable';
import { Student } from './Student';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { UpgradeStudentRequest } from '../application/Update/UpgradeStudentRequest';
import { StudentProfileDTO } from '../../Shared/domain/Students/StudentProfileDTO';

export interface StudentRepository {
  save(student: Student): Promise<void>;

  search(id: StudentId): Promise<Nullable<Student>>;

  searchProfile(id: StudentId): Promise<StudentProfileDTO>;

  update(values: UpgradeStudentRequest): Promise<void>;
}
