import { MotherCreator } from './MotherCreator';

export class PersonSurnameMother {
  static random(): string {
    return MotherCreator.random().name.lastName();
  }
}
