import { StudentNameMother } from '../../domain/StudentNameMother';
import { StudentSurnameMother } from '../../domain/StudentSurnameMother';
import { StudentLastnameMother } from '../../domain/StudentLastnameMother';
import { StudentIdMother } from '../../../Shared/domain/Students/StudentIdMother';
import { UpgradeStudentRequest } from '../../../../../../src/Contexts/LLBE/Students/application/Update/UpgradeStudentRequest';
import { QualificationMother } from '../../domain/QualificationMother';
import { StudentLangsMother } from '../../domain/StudentLangsMother';
import { JobExperiencesMother } from '../../domain/JobExperiencesMother';

export class UpgradeStudentRequestMother {
  static create(
    id: string,
    name: string,
    surname: string,
    lastname: string,
    qualification: { end_date: string; title: string; start_date: string },
    languages: { name: string; speak: number; write: number }[],
    // tslint:disable-next-line:variable-name
    job_experiences: {
      company: string;
      position: string;
      responsibilities: string;
      start_date: string;
      end_date: string; }[]
  ): UpgradeStudentRequest {
    return {
      id: id,
      name: name,
      surname: surname,
      lastname: lastname,
      qualification: qualification,
      languages: languages,
      job_experiences: job_experiences
    };
  }

  static random(): UpgradeStudentRequest {
    return this.create(
      StudentIdMother.random().value,
      StudentNameMother.random().value,
      StudentSurnameMother.random().value,
      StudentLastnameMother.random().value,
      QualificationMother.random().toPrimitives(),
      StudentLangsMother.randomToPrimitives(),
      JobExperiencesMother.randomToPrimitives()
    );
  }
}
