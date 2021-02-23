import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from './StudentName';
import { StudentSurname } from './StudentSurname';
import { StudentLastname } from './StudentLastname';
import { Qualification } from './Qualification';
import { Language } from './Language';
import { JobExperience } from './JobExperience';
import { UpgradeStudentRequest } from '../application/Update/UpgradeStudentRequest';

export class Student extends AggregateRoot {
  readonly id: StudentId;
  readonly name: StudentName | undefined;
  readonly surname: StudentSurname | undefined;
  readonly lastname: StudentLastname | undefined;
  private qualification: Qualification | undefined;
  private languages: Language[] | undefined;
  private jobexperiences: JobExperience[] | undefined;

  constructor(
    id: StudentId,
    name?: StudentName,
    surname?: StudentSurname,
    lastname?: StudentLastname,
    qualification ?: Qualification,
    languages ?: Language[],
    jobexperiences ?: JobExperience[]) {
    super();
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.lastname = lastname;
    this.qualification = qualification;
    this.languages = languages;
    this.jobexperiences = jobexperiences;
  }

  static create(
    id: StudentId,
    name?: StudentName,
    surname?: StudentSurname,
    lastname?: StudentLastname,
    qualification ?: Qualification,
    languages ?: Language[],
    jobexperiences ?: JobExperience[]): Student {
    return new Student(id, name, surname, lastname, qualification, languages, jobexperiences);
  }

  static fromPrimitives(
    plainData: UpgradeStudentRequest): Student {
    const name = typeof plainData.name === 'string' ? new StudentName(plainData.name) : undefined;
    const surname = typeof plainData.surname === 'string' ? new StudentSurname(plainData.surname) : undefined;
    const lastname = typeof plainData.lastname === 'string' ? new StudentLastname(plainData.lastname) : undefined;
    return new Student(
      new StudentId(plainData.id),
      name,
      surname,
      lastname,
      Qualification.fromPrimitives(plainData.qualification),
      this.languagesFromPrimitives(plainData.languages),
      this.jobexperiencesFromPrimitives(plainData.job_experiences)
  );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name?.value,
      surname: this.surname?.value,
      lastname: this.lastname?.value,
      qualification: this.qualification?.toPrimitives(),
      languages: this.languagesToPrimitives(),
      job_experiences: this.jobexperiencesToPrimitives()
    };
  }

  private languagesToPrimitives() {
    return this.languages?.map(language => language.toPrimitives());
  }

  private static languagesFromPrimitives(languages: { name: string; speak: number; write: number }[] | undefined) {
    if (languages === undefined) {
      return;
    }
    return languages.map(language => Language.fromPrimitives(language));
  }

  private jobexperiencesToPrimitives() {
    return this.jobexperiences?.map(job => job.toPrimitives());
  }

  private static jobexperiencesFromPrimitives(jobexperiences: {
    company: string;
    position: string;
    responsibilities: string;
    start_date: string;
    end_date: string
  }[] | undefined) {
    if (jobexperiences === undefined) {
      return;
    }
    return jobexperiences.map(job => JobExperience.fromPrimitives(job));
  }
}
