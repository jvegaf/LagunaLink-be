import {AggregateRoot} from '../../../Shared/domain/AggregateRoot';
import {StudentId} from '../../Shared/domain/Students/StudentId';
import {StudentName} from './StudentName';
import {StudentSurname} from './StudentSurname';
import {StudentLastname} from './StudentLastname';
import {Qualification} from "./Qualification";
import {Language} from "./Language";
import {JobExperience} from "./JobExperience";

export class Student extends AggregateRoot {
    readonly id: StudentId;
    readonly name: StudentName;
    readonly surname: StudentSurname;
    readonly lastname: StudentLastname;
    private qualifications: Qualification[] | undefined;
    private languages: Language[] | undefined;
    private jobexperiences: JobExperience[] | undefined;

    constructor(
        id: StudentId,
        name: StudentName,
        surname: StudentSurname,
        lastname: StudentLastname,
        qualifications ?: Qualification[],
        languages ?: Language[],
        jobexperiences ?: JobExperience[]) {
        super();
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lastname = lastname;
        this.qualifications = qualifications;
        this.languages = languages;
        this.jobexperiences = jobexperiences;
    }

    static create(
        id: StudentId,
        name: StudentName,
        surname: StudentSurname,
        lastname: StudentLastname,
        qualifications ?: Qualification[],
        languages ?: Language[],
        jobexperiences ?: JobExperience[]): Student {
        return new Student(id, name, surname, lastname, qualifications, languages, jobexperiences);
    }

    static fromPrimitives(
        plainData: {
            id: string;
            name: string;
            surname: string;
            lastname: string;
            qualifications: [];
            languages: [];
            job_experiences: [];
        }): Student {
        return new Student(
            new StudentId(plainData.id),
            new StudentName(plainData.name),
            new StudentSurname(plainData.surname),
            new StudentLastname(plainData.lastname),
            this.qualificationsFromPrimitives(plainData.qualifications),
            this.languagesFromPrimitives(plainData.languages),
            this.jobexperiencesFromPrimitives(plainData.job_experiences)
        );
    }

    toPrimitives() {
        return {
            id: this.id.value,
            name: this.name.value,
            surname: this.surname.value,
            lastname: this.lastname.value,
            qualifications: this.qualificationsToPrimitives(),
            languages: this.languagesToPrimitives(),
            job_experiences: this.jobexperiencesToPrimitives()
        };
    }

    private qualificationsToPrimitives() {
        return this.qualifications?.map(qualification => qualification.toPrimitives())
    }

    private languagesToPrimitives() {
        return this.languages?.map(language => language.toPrimitives());
    }


    private jobexperiencesToPrimitives() {
        return this.jobexperiences?.map(job => job.toPrimitives());
    }

    private static qualificationsFromPrimitives(qualifications: []) {
        if (qualifications === undefined) return;
        return qualifications.map(qualification => Qualification.fromPrimitives(qualification));
    }

    private static languagesFromPrimitives(languages: []) {
        if (languages === undefined) return;
        return languages.map(language => Language.fromPrimitives(language));
    }

    private static jobexperiencesFromPrimitives(jobexperiences: []) {
        if (jobexperiences === undefined) return;
        return jobexperiences.map(jobex => JobExperience.fromPrimitives(jobex));
    }
}
