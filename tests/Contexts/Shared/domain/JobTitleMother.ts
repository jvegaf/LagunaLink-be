import { MotherCreator } from './MotherCreator';

export class JobTitleMother {
  static random(): string {
    return MotherCreator.random().name.jobTitle();
  }
}
