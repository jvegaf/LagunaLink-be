import {AggregateRoot} from "../../../Shared/domain/AggregateRoot";
import {UserUpdatedAt} from "./UserUpdatedAt";
import {UserPassword} from "./UserPassword";
import {UserEmail} from "./UserEmail";
import {UserIsActive} from "./UserIsActive";
import {UserCreatedAt} from "./UserCreatedAt";
import { UserId } from "../../Shared/domain/Users/UserId";
import { UserRole } from "./UserRole";

export class User extends AggregateRoot {
    readonly id: UserId;
    readonly email: UserEmail;
    readonly password: UserPassword;
    readonly isActive: UserIsActive;
    readonly role: UserRole;
    readonly createdAt: UserCreatedAt;
    readonly updatedAt: UserUpdatedAt;


    constructor(
        id: UserId,
        email: UserEmail,
        password: UserPassword,
        isActive: UserIsActive,
        role: UserRole,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt
    ) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static create(
        id: UserId,
        email: UserEmail,
        password: UserPassword,
        isActive: UserIsActive,
        role: UserRole,
        createdAt: UserCreatedAt,
        updatedAt: UserUpdatedAt
    ): User {
        return new User(
            id,
            email,
            password,
            isActive,
            role,
            createdAt,
            updatedAt
            );
    }

    static fromPrimitives(
        plaindata: {
            id: string;
            email: string;
            password: string;
            isActive: boolean;
            role: string;
            createdAt: string;
            updatedAt: string;
        } ){
        return new User(
            new UserId(plaindata.id),
            new UserEmail(plaindata.email),
            new UserPassword(plaindata.password),
            new UserIsActive(plaindata.isActive),
            new UserRole(plaindata.role),
            new UserCreatedAt(plaindata.createdAt),
            new UserUpdatedAt(plaindata.updatedAt)
        );
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
            email: this.email.value,
            password: this.password.value,
            isActive: this.isActive.value,
            role: this.role.value,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

}
