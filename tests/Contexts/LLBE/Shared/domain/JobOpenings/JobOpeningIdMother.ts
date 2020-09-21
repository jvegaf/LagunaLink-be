import { UuidMother } from '../../../../Shared/domain/UuidMother';
import {JobOpeningId} from "../../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId";

export class JobOpeningIdMother {
  static create(value: string): JobOpeningId {
    return new JobOpeningId(value);
  }

  static creator() {
    return () => JobOpeningIdMother.random();
  }

  static random(): JobOpeningId {
    return this.create(UuidMother.random());
  }
}
