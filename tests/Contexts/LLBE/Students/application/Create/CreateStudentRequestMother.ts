import { CreateStudentRequest } from '../../../../../../src/Contexts/LLBE/Students/application/Create/CreateStudentRequest';
import { StudentSurname } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { StudentName } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { StudentLastname } from '../../../../../../src/Contexts/LLBE/Students/domain/StudentLastname';
import { StudentNameMother } from '../../domain/StudentNameMother';
import { StudentSurnameMother } from '../../domain/StudentSurnameMother';
import { StudentLastnameMother } from '../../domain/StudentLastnameMother';
import { StudentId } from "../../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId";
import { StudentIdMother } from "../../../Shared/domain/Students/StudentIdMother";

export class CreateStudentRequestMother {
  static create(
    id: StudentId,
    name: StudentName,
    surname: StudentSurname,
    lastname: StudentLastname): CreateStudentRequest {
    return {
      id: id.value,
      name: name.value,
      surname: surname.value,
      lastname: lastname.value
    };
  }

  static random(): CreateStudentRequest {
    return this.create(
      StudentIdMother.random(),
      StudentNameMother.random(),
      StudentSurnameMother.random(),
      StudentLastnameMother.random()
    );
  }

  static randomWithId(id: string): CreateStudentRequest {
    return this.create(
        StudentIdMother.create(id),
        StudentNameMother.random(),
        StudentSurnameMother.random(),
        StudentLastnameMother.random()
    );
  }
}
