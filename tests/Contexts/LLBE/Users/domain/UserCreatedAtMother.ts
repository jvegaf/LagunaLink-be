import { UserCreatedAt } from '../../../../../src/Contexts/LLBE/Users/domain/UserCreatedAt';
import { DateMother } from '../../../Shared/domain/DateMother';

export class UserCreatedAtMother {
    static create(value: string): UserCreatedAt {
        return new UserCreatedAt(value);
    }

    static random(): UserCreatedAt {
        return this.create(DateMother.random().toISOString());
    }
}
