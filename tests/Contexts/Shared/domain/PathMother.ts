import { MotherCreator } from './MotherCreator';

export class PathMother {
  static random(): string {
    return MotherCreator.random().system.filePath();
  }
}
