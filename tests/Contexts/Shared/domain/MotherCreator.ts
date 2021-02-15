import * as faker from 'faker/locale/es';

export class MotherCreator {
  static random(): Faker.FakerStatic {
    return faker;
  }
}
