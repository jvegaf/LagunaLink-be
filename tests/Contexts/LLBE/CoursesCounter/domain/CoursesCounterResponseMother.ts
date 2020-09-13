import { CoursesCounterTotal } from '../../../../../src/Contexts/LLBE/CoursesCounter/domain/CoursesCounterTotal';
import { CoursesCounterResponse } from '../../../../../src/Contexts/LLBE/CoursesCounter/application/Find/CoursesCounterResponse';

export class CoursesCounterResponseMother {
  static create(total: CoursesCounterTotal) {
    return new CoursesCounterResponse(total.value);
  }
}
