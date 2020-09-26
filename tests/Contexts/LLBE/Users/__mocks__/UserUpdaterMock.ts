import { UserRepository } from '../../../../../src/Contexts/LLBE/Users/domain/UserRepository';
import { UpdateUserRequest } from '../../../../../src/Contexts/LLBE/Users/application/UpdateUserRequest';

export class UserUpdaterMock {
  private repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(request: UpdateUserRequest): Promise<void> {
    return;
  }
}
