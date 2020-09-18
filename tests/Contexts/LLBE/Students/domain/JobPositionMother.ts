import { WordMother } from '../../../Shared/domain/WordMother';
import {JobPosition} from "../../../../../src/Contexts/LLBE/Students/domain/JobPosition";

export class JobPositionMother {
  static create(value: string): JobPosition {
    return new JobPosition(value);
  }

  static random(): JobPosition {
    return this.create(WordMother.random());
  }
}
