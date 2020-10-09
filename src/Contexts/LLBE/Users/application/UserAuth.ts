import { TokenGenerator } from '../domain/TokenGenerator';
import { UserRepository } from '../domain/UserRepository';
import { AuthUserRequest } from './AuthUserRequest';
import { UserEmail } from '../domain/UserEmail';
import { UserAuthFail } from './UserAuthFail';
import { AuthResponse } from './AuthResponse';
import { AccountNotConfirmed } from './AccountNotConfirmed';

export class UserAuth {
  private readonly tokenGenerator: TokenGenerator;
  private readonly repository: UserRepository;

  constructor(generator: TokenGenerator, repository: UserRepository) {
    this.tokenGenerator = generator;
    this.repository = repository;
  }

  async run(request: AuthUserRequest): Promise<AuthResponse> {
    const user = await this.repository.searchByEmail(
      new UserEmail(request.email)
    );
    if (user === null) {
      throw new UserAuthFail('Incorrect Email or Password');
    }
    if (user.password.value !== request.password) {
      throw new UserAuthFail('Incorrect Email or Password');
    }
    if (!user.isActive.value) {
      throw new AccountNotConfirmed(
        'You need activate your account before continuing'
      );
    }
    let message = 'Register not complete';
    if (user.registered.value) {
      message = 'Registered';
    }
    const payload = { userId: user.id.value, role: user.role.value };

    const token = this.tokenGenerator.run(payload);
    return new AuthResponse(message, token.value);
  }
}
