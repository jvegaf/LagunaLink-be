import { MotherCreator } from './MotherCreator';

export class PersonNameMother {
  static random(): string {
    return MotherCreator.random().name.firstName();
  }
}
