import { MotherCreator } from './MotherCreator';

export class DegreeTitleMother {
  static random(): string {
    return MotherCreator.random().name.title();
  }
}
