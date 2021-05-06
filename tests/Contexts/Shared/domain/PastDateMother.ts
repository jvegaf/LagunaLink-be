import { MotherCreator } from './MotherCreator';

export class PastDateMother {
  static random(): Date {
    return MotherCreator.random().date.past();
  }
}
