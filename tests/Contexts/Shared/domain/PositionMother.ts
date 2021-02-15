import { MotherCreator } from './MotherCreator';

export class PositionMother {
  static random(): string {
    return MotherCreator.random().name.jobType();
  }
}
