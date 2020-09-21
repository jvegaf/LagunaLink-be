import { WordMother } from '../../../Shared/domain/WordMother';
import {JobOpenPosition} from "../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPosition";

export class JobOpenPositionMother {
  static create(value: string): JobOpenPosition {
    return new JobOpenPosition(value);
  }

  static random(): JobOpenPosition {
    return this.create(WordMother.random());
  }
}
