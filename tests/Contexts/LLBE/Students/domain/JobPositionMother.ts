import { JobPosition } from '../../../../../src/Contexts/LLBE/Students/domain/JobPosition';
import { PositionMother } from '../../../Shared/domain/PositionMother';

export class JobPositionMother {
  static create(value: string): JobPosition {
    return new JobPosition(value);
  }

  static random(): JobPosition {
    return this.create(PositionMother.random());
  }
}
