import { TitleName } from './TitleName';
import { StartDate } from '../../Shared/domain/StartDate';
import { EndDate } from '../../Shared/domain/EndDate';

export class Qualification {
  readonly title: TitleName;
  readonly start_date: StartDate;
  readonly end_date: EndDate;

  constructor(title: TitleName, start_date: StartDate, end_date: EndDate) {
    this.title = title;
    this.start_date = start_date;
    this.end_date = end_date;
  }

  static fromPrimitives(plaindata: { title: string, start_date: string, end_date: string }) {
    return new Qualification(
      new TitleName(plaindata.title),
      new StartDate(plaindata.start_date),
      new EndDate(plaindata.end_date)
    );
  }

  toPrimitives() {
    return {
      title: this.title.value,
      start_date: this.start_date.toString(),
      end_date: this.end_date.toString()
    };
  }
}
