import { TokenGenerator } from '../domain/TokenGenerator';
import { UserRepository } from '../domain/UserRepository';
import { AuthUserRequest } from './AuthUserRequest';
import { UserEmail } from '../domain/UserEmail';
import { UserAuthFail } from './UserAuthFail';
import { AuthResponse } from './AuthResponse';
import { AccountNotConfirmed } from './AccountNotConfirmed';
import { compareSync } from 'bcryptjs';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';

export class UserAuth extends ApplicationService {
  private readonly tokenGenerator: TokenGenerator;
  private readonly repository: UserRepository;

  constructor(generator: TokenGenerator, repository: UserRepository) {
    super();
    this.tokenGenerator = generator;
    this.repository = repository;
  }

  async run(request: AuthUserRequest): Promise<AuthResponse> {
    const user = await this.repository.searchByEmail(
      new UserEmail(request.email)
    );
    const incorrectEmailOrPassword = 'Incorrect Email or Password';
    if (user === null) {
      this.logError(incorrectEmailOrPassword);
      throw new UserAuthFail(incorrectEmailOrPassword);
    }
    if (!compareSync(request.password, user.password.value)) {
      this.logError(incorrectEmailOrPassword);
      throw new UserAuthFail(incorrectEmailOrPassword);
    }
    if (!user.isActive.value) {
      this.logError(`the user ${user.email.value} is not active`);
      throw new AccountNotConfirmed(
        'You need activate your account before continuing'
      );
    }

    let code = user.role.value === 'ROLE_STUDENT' ? 230 : 231;

    let message = 'Register not complete';
    if (user.registered.value) {
      message = 'Registered';
      code = 200;
    }
    const payload = { userId: user.id.value, role: user.role.value };

    const token = this.tokenGenerator.run(payload);
    this.logInfo(`user ${user.email.value} authenticated`);
    return new AuthResponse(code, message, user.id.value, token.value);
  }
}
