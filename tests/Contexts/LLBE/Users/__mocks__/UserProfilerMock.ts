import {UserProfiler} from '../../../../../src/Contexts/LLBE/Shared/application/Users/UserProfiler';
import {UserProfileDTO} from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserProfileDTO';

export class UserProfilerMock extends UserProfiler {
  private MockRun = jest.fn();

  public async run(): Promise<UserProfileDTO> {
    return this.MockRun();
  }
}
