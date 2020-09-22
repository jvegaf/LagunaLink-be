import { UserIsActive } from "../../../../../src/Contexts/LLBE/Users/domain/UserIsActive";
import { BooleanMother } from "../../../Shared/domain/BooleanMother";

export class UserIsActiveMother {
    static create(value: boolean): UserIsActive {
        return new UserIsActive(value);
    }

    static random(): UserIsActive {
        return this.create(BooleanMother.random());
    }
}
