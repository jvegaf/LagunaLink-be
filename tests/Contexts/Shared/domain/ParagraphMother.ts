import { MotherCreator } from './MotherCreator';

export class ParagraphMother {
  static random(): string {
    return MotherCreator.random().lorem.paragraph();
  }
}
