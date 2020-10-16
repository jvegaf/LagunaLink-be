import { CreateStudentRequestMother } from '../application/CreateStudentRequestMother';
import { StudentMother } from './StudentMother';

describe('Student', () => {

  it('should return a new student instance', () => {
    const request = CreateStudentRequestMother.random();

    const student = StudentMother.fromCreateRequest(request);

    expect(student.name.value).toBe(request.name);
    expect(student.surname.value).toBe(request.surname);
    expect(student.lastname.value).toBe(request.lastname);
  });
});
