import { AggregateRoot } from './AggregateRoot';
import { StudentId } from '../../Shared/domain/Students/StudentId';
import { StudentName } from './StudentName';
import { StudentSurname } from './StudentSurname';
import { StudentLastname } from './StudentLastname';

export class Student extends AggregateRoot {
  readonly id: StudentId;
  readonly name: StudentName;
  readonly surname: StudentSurname;
  readonly lastname: StudentLastname;

  constructor(id: StudentId, name: StudentName, surname: StudentSurname, lastname: StudentLastname) {
    super();
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.lastname = lastname;
  }

  static create(id: StudentId, name: StudentName, surname: StudentSurname, lastname: StudentLastname): Student {
    const student = new Student(id, name, surname, lastname);

    return student;
  }

  static fromPrimitives(plainData: { id: string; name: string; surname: string; lastname: string }): Student {
    return new Student(
      new StudentId(plainData.id),
      new StudentName(plainData.name),
      new StudentSurname(plainData.surname),
      new StudentLastname(plainData.lastname)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      surname: this.surname.value,
      lastname: this.lastname.value
    };
  }
}
