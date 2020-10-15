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
import { Qualification } from '../../../../../src/Contexts/LLBE/Students/domain/Qualification';
import { Language } from '../../../../../src/Contexts/LLBE/Students/domain/Language';
import { JobExperience } from '../../../../../src/Contexts/LLBE/Students/domain/JobExperience';
import { QualificationsMother } from './QualificationsMother';
import { StudentLangsMother } from './StudentLangsMother';
import { JobExperiencesMother } from './JobExperiencesMother';

export class StudentMother {
    static create(
      id: StudentId,
      name: StudentName,
      surname: StudentSurname,
      lastname: StudentLastname,
      qualifications?: Qualification[],
      languages?: Language[],
      jobexperiences?: JobExperience[]): Student {
        return new Student(id, name, surname, lastname, qualifications, languages, jobexperiences);
    }

    static fromCreateRequest(request: CreateStudentRequest): Student {
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
            StudentLastnameMother.random(),
            QualificationsMother.random(),
            StudentLangsMother.random(),
            JobExperiencesMother.random()
        );
    }
}
