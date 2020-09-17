import { MotherCreator } from './MotherCreator';

export class IntegerMother {
  static random(min?: number, max?: number): number {
    return MotherCreator.random().random.number(min, max);
  }
}
