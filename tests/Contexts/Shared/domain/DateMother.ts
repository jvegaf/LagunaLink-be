import { MotherCreator } from './MotherCreator';

export class DateMother {
  static random(): Date {
    return MotherCreator.random().date.past();
  }
}
