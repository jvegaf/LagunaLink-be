import { StudentId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { StudentSurname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';
import { CreateStudentRequest } from '../../../../../src/Contexts/LLBE/Students/application/CreateStudentRequest';
import { StudentIdMother } from '../../Shared/domain/Students/StudentIdMother';
import { StudentNameMother } from './StudentNameMother';
import { StudentLastname } from '../../../../../src/Contexts/LLBE/Students/domain/StudentLastname';
import { StudentSurnameMother } from './StudentSurnameMother';
import { StudentLastnameMother } from './StudentLastnameMother';

export class StudentMother {
  static create(id: StudentId, name: StudentName, surname: StudentSurname, lastname: StudentLastname): Student {
    return new Student(id, name, surname, lastname);
  }

  static fromRequest(request: CreateStudentRequest): Student {
    return this.create(
      StudentIdMother.random(),
      StudentNameMother.create(request.name),
      StudentSurnameMother.create(request.surname),
      StudentLastnameMother.create(request.lastname)
    );
  }

  static random(): Student {
    return this.create(
      StudentIdMother.random(),
      StudentNameMother.random(),
      StudentSurnameMother.random(),
      StudentLastnameMother.random());
  }
}
