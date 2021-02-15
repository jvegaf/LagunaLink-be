import { JobOpenPosition } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenPosition';
import { PositionMother } from '../../../Shared/domain/PositionMother';

export class JobOpenPositionMother {
  static create(value: string): JobOpenPosition {
    return new JobOpenPosition(value);
  }

  static random(): JobOpenPosition {
    return this.create(PositionMother.random());
  }
}
