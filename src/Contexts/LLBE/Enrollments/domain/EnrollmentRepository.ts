import { Nullable } from '../../../Shared/domain/Nullable';
import { Enrollment } from './Enrollment';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';
import { StudentId } from '../../Shared/domain/Students/StudentId';

export interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<void>;

  search(id: EnrollmentId): Promise<Nullable<Enrollment>>;

  searchByJobOpening(id: JobOpeningId): Promise<Array<Enrollment>>;

  searchByStudent(id: StudentId): Promise<Array<Enrollment>>;

  remove(id: EnrollmentId): Promise<void>;
}
