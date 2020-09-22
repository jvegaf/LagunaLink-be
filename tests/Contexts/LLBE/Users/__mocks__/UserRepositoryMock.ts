import { User } from '../../../../../src/Contexts/LLBE/Users/domain/User';
import { UserId } from '../../../../../src/Contexts/LLBE/Shared/domain/Users/UserId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { UserRepository } from "../../../../../src/Contexts/LLBE/Users/domain/UserRepository";

export class UserRepositoryMock implements UserRepository {
    private mockSave = jest.fn();
    private mockSearch = jest.fn();

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

    whenSearchThenReturn(value: Nullable<User>): void {
        this.mockSearch.mockReturnValue(value);
    }

    assertLastSearchedUserIs(expected: UserId): void {
        expect(this.mockSearch).toHaveBeenCalledWith(expected);
    }
}
