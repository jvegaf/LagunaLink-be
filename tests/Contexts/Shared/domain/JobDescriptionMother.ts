import { MotherCreator } from './MotherCreator';

export class JobDescriptionMother {
  static random(): string {
    return MotherCreator.random().lorem .sentence();
  }
}
