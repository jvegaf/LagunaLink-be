import { MotherCreator } from './MotherCreator';

export class FutureDateMother {

  static random(): Date {
    const today = new Date(Date.now());
    const futDate = new Date();
    futDate.setDate(today.getDate() + 90);
    return MotherCreator.random().date.between(today, futDate);
  }
}
