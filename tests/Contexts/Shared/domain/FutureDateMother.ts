import { MotherCreator } from './MotherCreator';

export class FutureDateMother {
  private static readonly MAX_DAYS = 90;

  static random(): Date {
    const today = new Date(Date.now());
    const futDate = new Date();
    futDate.setDate(today.getDate() + this.MAX_DAYS);
    return MotherCreator.random().date.between(today, futDate);
  }
}
