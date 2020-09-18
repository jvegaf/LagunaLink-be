import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { WordMother } from '../../../Shared/domain/WordMother';
import {JobRespons} from "../../../../../src/Contexts/LLBE/Students/domain/JobRespons";

export class JobResponsMother {
  static create(value: string): JobRespons {
    return new JobRespons(value);
  }

  static random(): JobRespons {
    return this.create(WordMother.random());
  }
}
