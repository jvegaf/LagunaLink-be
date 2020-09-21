import { MotherCreator } from './MotherCreator';

export class CityMother {
  static random(): string {
    return MotherCreator.random().address.city(3);
  }
}
