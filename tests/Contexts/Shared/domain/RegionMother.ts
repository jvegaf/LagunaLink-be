import { MotherCreator } from './MotherCreator';

export class RegionMother {
  static random(): string {
    return MotherCreator.random().address.county();
  }
}
