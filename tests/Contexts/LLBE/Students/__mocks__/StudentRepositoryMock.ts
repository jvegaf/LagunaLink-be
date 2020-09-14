import { StudentRepository } from '../../../../../src/Contexts/LLBE/Students/domain/StudentRepository';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';
import { StudentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class StudentRepositoryMock implements StudentRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();

  async save(student: Student): Promise<void> {
    this.mockSave(student);
  }

  assertLastSavedStudentIs(expected: Student): void {
    const mock = this.mockSave.mock;
    const lastSavedStudent = mock.calls[mock.calls.length - 1][0] as Student;
    expect(lastSavedStudent).toBeInstanceOf(Student);
    expect(lastSavedStudent.name).toEqual(expected.name);
    expect(lastSavedStudent.surname).toEqual(expected.surname);
    expect(lastSavedStudent.lastname).toEqual(expected.lastname);
  }

  async search(id: StudentId): Promise<Nullable<Student>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<Student>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedStudentIs(expected: StudentId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }
}
