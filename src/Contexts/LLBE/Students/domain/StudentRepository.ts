import {Nullable} from '../../../Shared/domain/Nullable';
import {Student} from './Student';
import {StudentId} from '../../Shared/domain/Students/StudentId';
import {UpgradeStudentRequest} from '../application/Update/UpgradeStudentRequest';

export interface StudentRepository {
  save(student: Student): Promise<void>;

  search(id: StudentId): Promise<Nullable<Student>>;

  searchProfile(id: StudentId): Promise<Student>;

  update(values: UpgradeStudentRequest): Promise<void>;
}
