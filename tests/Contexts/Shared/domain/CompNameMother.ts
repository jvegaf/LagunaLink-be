import { MotherCreator } from './MotherCreator';

export class CompNameMother {
  static random(): string {
    return MotherCreator.random().company.companyName();
  }
}
