import { Nullable } from '../../../Shared/domain/Nullable';
import { Enrollment } from './Enrollment';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';

export interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<void>;

  search(id: EnrollmentId): Promise<Nullable<Enrollment>>;

  remove(id: EnrollmentId): Promise<void>;
}
