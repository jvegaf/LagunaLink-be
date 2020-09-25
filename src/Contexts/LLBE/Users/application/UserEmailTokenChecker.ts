import { Encoder } from '../../../Shared/application/encoder/Encoder';
import { Token } from '../../../Shared/application/encoder/Token';
import { UpdateUserRequest } from './UpdateUserRequest';
import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserUpdater } from './UserUpdater';
import { User } from '../domain/User';

export class UserEmailTokenChecker {

  private readonly encoder: Encoder;
  private readonly repository: UserRepository;
  private userUpdater: UserUpdater;

  constructor(encoder: Encoder, repository: UserRepository, userUpdater: UserUpdater) {
    this.userUpdater = userUpdater;
    this.repository = repository;
    this.encoder = encoder;
  }

  async check(token: Token): Promise<void> {
    const payload = this.encoder.decode(token);
    const user = await this.repository.search(new UserId(payload.userId)) as User;
    const request: UpdateUserRequest = {
      id: user.id.toString(),
      email: user.email.value,
      password: user.password.value,
      isActive: true,
      role: user.role.value,
      createdAt: user.createdAt.toISOString()
    };

    await this.userUpdater.run(request);
  }
}
