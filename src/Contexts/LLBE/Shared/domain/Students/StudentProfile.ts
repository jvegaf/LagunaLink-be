import { JobOpening } from '../../../JobOpenings/domain/JobOpening';
import { Enrollment } from '../../../Enrollments/domain/Enrollment';
import { Student } from '../../../Students/domain/Student';
import { StudentProfileType } from './StudentProfileType';
import { StudentProfileDTO } from './StudentProfileDTO';
import { StudentId } from './StudentId';
import { StudentName } from '../../../Students/domain/StudentName';
import { StudentSurname } from '../../../Students/domain/StudentSurname';
import { StudentLastname } from '../../../Students/domain/StudentLastname';
import { Qualification } from '../../../Students/domain/Qualification';

export class StudentProfile extends Student {
  readonly enrolls: Enrollment[];
  readonly jobOpenings: JobOpening[];

  constructor(values: StudentProfileType) {
    super(values);
    this.enrolls = values.enrolls;
    this.jobOpenings = values.jobOpenings;
  }

  static fromPrimitives(plainData: StudentProfileDTO) {
    return new StudentProfile({
      id: new StudentId(plainData.id),
      name: new StudentName(plainData.name),
      surname: new StudentSurname(plainData.surname),
      lastname: new StudentLastname(plainData.lastname),
      qualification: Qualification.fromPrimitives(plainData.qualification),
      languages: this.languagesFromPrimitives(plainData.languages),
      jobexperiences: this.jobexperiencesFromPrimitives(plainData.job_experiences),
      enrolls: plainData.enrolls.map(en => Enrollment.fromPrimitives(en)),
      jobOpenings: plainData.jobOpenings.map(j => JobOpening.fromPrimitives(j)),
    });
  }

  toPrimitives(): StudentProfileDTO {
    return {
      ...super.toPrimitives(),
      enrolls: this.enrolls.map(en => en.toPrimitives()),
      jobOpenings: this.jobOpenings.map(j => j.toPrimitives()),
    };
  }
}
