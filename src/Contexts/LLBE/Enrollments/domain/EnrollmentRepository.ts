import { Nullable } from '../../../Shared/domain/Nullable';
import { Enrollment } from './Enrollment';
import { EnrollmentId } from '../../Shared/domain/Enrollments/EnrollmentId';
import { JobOpeningId } from '../../Shared/domain/JobOpenings/JobOpeningId';

export interface EnrollmentRepository {
  save(enrollment: Enrollment): Promise<void>;

  search(id: EnrollmentId): Promise<Nullable<Enrollment>>;

  searchByJobOpening(id: JobOpeningId): Promise<Array<Enrollment>>;

  remove(id: EnrollmentId): Promise<void>;
}
