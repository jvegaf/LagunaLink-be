import { MotherCreator } from './MotherCreator';

export class PostalCodeMother {
  static random(): number {
    return parseInt(MotherCreator.random().address.zipCode('#####'));
  }
}
