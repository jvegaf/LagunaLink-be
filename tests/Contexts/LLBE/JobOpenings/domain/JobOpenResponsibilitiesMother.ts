import { WordMother } from '../../../Shared/domain/WordMother';
import {JobOpenResponsibilities} from "../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpenResponsibilities";

export class JobOpenResponsibilitiesMother {
  static create(value: string): JobOpenResponsibilities {
    return new JobOpenResponsibilities(value);
  }

  static random(): JobOpenResponsibilities {
    return this.create(WordMother.random());
  }
}
