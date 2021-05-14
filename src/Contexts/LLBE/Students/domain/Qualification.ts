import { TitleName } from './TitleName';
import { StartDate } from '../../Shared/domain/StartDate';
import { EndDate } from '../../Shared/domain/EndDate';

export class Qualification {
  readonly title: TitleName;
  readonly startDate: StartDate;
  readonly endDate: EndDate;

  constructor(title: TitleName, startDate: StartDate, endDate: EndDate) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  static fromPrimitives(plaindata: { title: string; start_date: Date; end_date: Date }) {
    return new Qualification(
      new TitleName(plaindata.title),
      new StartDate(plaindata.start_date),
      new EndDate(plaindata.end_date)
    );
  }

  toPrimitives() {
    return {
      title: this.title.value,
      start_date: this.startDate,
      end_date: this.endDate,
    };
  }
}
