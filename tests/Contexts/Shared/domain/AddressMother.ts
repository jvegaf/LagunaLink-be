import { MotherCreator } from './MotherCreator';

export class AddressMother {
  static random(): string {
    return MotherCreator.random().address.streetAddress('###');
  }
}
