import { UserRepository } from "../domain/UserRepository";
import { CreateUserRequest } from "./CreateUserRequest";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserIsActive } from "../domain/UserIsActive";
import { User } from "../domain/User";
import { UserId } from "../../Shared/domain/Users/UserId";
import { UserUpdatedAt } from "../domain/UserUpdatedAt";
import { UserCreatedAt } from "../domain/UserCreatedAt";
import { UserRole } from "../domain/UserRole";

export class UserCreator {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    async run(request: CreateUserRequest): Promise<void> {
        const user = User.create(
            new UserId(request.id),
            new UserEmail(request.email),
            new UserPassword(request.password),
            new UserIsActive(request.isActive),
            new UserRole(request.role),
            new UserCreatedAt(request.createdAt),
            new UserUpdatedAt(request.updatedAt)
        );

        await this.repository.save(user);
    }
}
