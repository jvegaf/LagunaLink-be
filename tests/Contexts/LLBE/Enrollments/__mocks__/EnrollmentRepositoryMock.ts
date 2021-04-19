import { EnrollmentRepository } from '../../../../../src/Contexts/LLBE/Enrollments/domain/EnrollmentRepository';
import { Enrollment } from '../../../../../src/Contexts/LLBE/Enrollments/domain/Enrollment';
import { EnrollmentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Enrollments/EnrollmentId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { JobOpeningId } from '../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { StudentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';

export class EnrollmentRepositoryMock implements EnrollmentRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockFetch = jest.fn();

  async save(enrollment: Enrollment): Promise<void> {
    this.mockSave(enrollment);
  }

  assertLastSavedEnrollmentIs(expected: Enrollment): void {
    const mock = this.mockSave.mock;
    const lastSavedEnrollment = mock.calls[mock.calls.length - 1][0] as Enrollment;
    expect(lastSavedEnrollment).toBeInstanceOf(Enrollment);
    expect(lastSavedEnrollment.student).toEqual(expected.student);
    expect(lastSavedEnrollment.jobOpening).toEqual(expected.jobOpening);
  }

  async search(id: EnrollmentId): Promise<Nullable<Enrollment>> {
    return this.mockSearch(id);
  }

  searchByStudent(id: StudentId): Promise<Array<Enrollment>> {
    return this.mockFetch(id);
  }

  whenSearchThenReturn(value: Nullable<Enrollment>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedCompanyIs(expected: EnrollmentId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  remove(id: EnrollmentId): Promise<void> {
    return Promise.resolve();
  }

  searchByJobOpening(id: JobOpeningId): Promise<Array<Enrollment>> {
    return Promise.resolve([]);
  }
}
