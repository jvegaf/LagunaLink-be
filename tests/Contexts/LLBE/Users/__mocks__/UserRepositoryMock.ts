import { User } from '../../../../../src/Contexts/LLBE/Users/domain/User';
import { UserId } from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { UserRepository } from '../../../../../src/Contexts/LLBE/Users/domain/UserRepository';
import { UserEmail } from '../../../../../src/Contexts/LLBE/Users/domain/UserEmail';
import { CreateUserRequestMother } from '../application/CreateUserRequestMother';
import { UserMother } from '../domain/UserMother';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private emails: string[] = [];

  async save(user: User): Promise<void> {
    this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = mock.calls[mock.calls.length - 1][0] as User;
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.email).toEqual(expected.email);
    expect(lastSavedUser.password).toEqual(expected.password);
    expect(lastSavedUser.isActive).toEqual(expected.isActive);
  }

  async search(id: UserId): Promise<Nullable<User>> {
    return this.mockSearch(id);
  }

  async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const userEmail = email.value;

    if (this.emails.indexOf(userEmail) !== -1) {
      return this.createUserWithEmail(userEmail);
    }

    this.emails.push(userEmail);

    return null;
  }

  whenSearchThenReturn(value: Nullable<User>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedUserIs(expected: UserId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  private createUserWithEmail(userEmail: string) {
    const request = CreateUserRequestMother.random();
    request.email = userEmail;

    return UserMother.fromRequest(request);
  }
}
