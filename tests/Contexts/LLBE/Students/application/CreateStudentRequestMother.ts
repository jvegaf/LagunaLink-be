import { CreateStudentRequest } from '../../../../../src/Contexts/LLBE/Students/application/CreateStudentRequest';
import { StudentSurname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { StudentLastname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentLastname';
import { StudentNameMother } from '../domain/StudentNameMother';
import { StudentSurnameMother } from '../domain/StudentSurnameMother';
import { StudentLastnameMother } from '../domain/StudentLastnameMother';

export class CreateStudentRequestMother {
  static create(name: StudentName, surname: StudentSurname, lastname: StudentLastname): CreateStudentRequest {
    return { name: name.value, surname: surname.value, lastname: lastname.value };
  }

  static random(): CreateStudentRequest {
    return this.create(StudentNameMother.random(), StudentSurnameMother.random(), StudentLastnameMother.random());
  }
}
