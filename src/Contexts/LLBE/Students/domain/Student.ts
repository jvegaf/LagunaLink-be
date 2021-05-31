import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from './StudentName';
import { StudentSurname } from './StudentSurname';
import { StudentLastname } from './StudentLastname';
import { Qualification } from './Qualification';
import { Language } from './Language';
import { JobExperience } from './JobExperience';
import { StudentType } from '../../Shared/domain/Students/StudentType';
import { StudentDTO } from '../../Shared/domain/Students/StudentDTO';

export class Student extends AggregateRoot {
  readonly id: StudentId;
  readonly name: StudentName;
  readonly surname: StudentSurname;
  readonly lastname: StudentLastname;
  readonly qualification: Qualification;
  readonly languages: Language[];
  readonly jobexperiences: JobExperience[];

  constructor(student: StudentType) {
    super();
    this.id = student.id;
    this.name = student.name;
    this.surname = student.surname;
    this.lastname = student.lastname;
    this.qualification = student.qualification;
    this.languages = student.languages;
    this.jobexperiences = student.jobexperiences;
  }

  static create(data: StudentType): Student {
    return new Student(data);
  }

  static fromPrimitives(plainData: StudentDTO): Student {
    return new Student({
      id: new StudentId(plainData.id),
      name: new StudentName(plainData.name),
      surname: new StudentSurname(plainData.surname),
      lastname: new StudentLastname(plainData.lastname),
      qualification: Qualification.fromPrimitives(plainData.qualification),
      languages: this.languagesFromPrimitives(plainData.languages),
      jobexperiences: this.jobexperiencesFromPrimitives(plainData.job_experiences),
    });
  }

  protected static languagesFromPrimitives(languages: { name: string; speak: number; write: number }[]) {
    return languages.map(language => Language.fromPrimitives(language));
  }

  protected static jobexperiencesFromPrimitives(
    jobexperiences: {
      company: string;
      position: string;
      responsibilities: string;
      start_date: string;
      end_date: string;
    }[]
  ) {
    return jobexperiences.map(job => JobExperience.fromPrimitives(job));
  }

  toPrimitives(): StudentDTO {
    return {
      id: this.id.value,
      name: this.name.value,
      surname: this.surname.value,
      lastname: this.lastname.value,
      qualification: this.qualification.toPrimitives(),
      languages: this.languagesToPrimitives(),
      job_experiences: this.jobexperiencesToPrimitives(),
    };
  }

  private languagesToPrimitives() {
    return this.languages.map(language => language.toPrimitives());
  }

  private jobexperiencesToPrimitives() {
    return this.jobexperiences.map(job => job.toPrimitives());
  }
}
