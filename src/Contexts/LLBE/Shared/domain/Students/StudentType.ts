import { StudentId } from './StudentId';
import { StudentName } from '../../../Students/domain/StudentName';
import { StudentSurname } from '../../../Students/domain/StudentSurname';
import { StudentLastname } from '../../../Students/domain/StudentLastname';
import { Qualification } from '../../../Students/domain/Qualification';
import { Language } from '../../../Students/domain/Language';
import { JobExperience } from '../../../Students/domain/JobExperience';

export type StudentType = {
  id: StudentId;
  name: StudentName;
  surname: StudentSurname;
  lastname: StudentLastname;
  qualification: Qualification;
  languages: Language[];
  jobexperiences: JobExperience[];
};
