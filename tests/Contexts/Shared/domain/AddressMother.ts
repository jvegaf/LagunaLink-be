import { MotherCreator } from './MotherCreator';

export class AddressMother {
  static random(): string {
    // @ts-ignore
    return MotherCreator.random().address.streetAddress('###');
  }
}
