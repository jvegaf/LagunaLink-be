import { CourseRepository } from '../../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';
import { CourseId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class CourseRepositoryMock implements CourseRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(course: Student): Promise<void> {
    this.mockSave(course);
  }

  assertLastSavedCourseIs(expected: Student): void {
    const mock = this.mockSave.mock;
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as Student;
    expect(lastSavedCourse).toBeInstanceOf(Student);
    expect(lastSavedCourse.toPrimitives()).toEqual(expected.toPrimitives());
  }

  async search(id: CourseId): Promise<Nullable<Student>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<Student>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedCourseIs(expected: CourseId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }
}
