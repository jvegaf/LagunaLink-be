import { TokenGenerator } from '../domain/TokenGenerator';
import { UserRepository } from '../domain/UserRepository';
import { AuthUserRequest } from './AuthUserRequest';
import { UserEmail } from '../domain/UserEmail';
import { UserAuthFail } from './UserAuthFail';
import { AuthResponse } from './AuthResponse';
import { AccountNotConfirmed } from './AccountNotConfirmed';
import { compareSync } from 'bcryptjs';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserProfiler } from '../../Shared/application/Users/UserProfiler';
import { User } from '../domain/User';
import { Token } from '../domain/Token';

const BAD_EMAIL_PASS_MESSAGE = 'Incorrect Email or Password';

export class UserAuth extends ApplicationService {
  private readonly tokenGenerator: TokenGenerator;
  private readonly repository: UserRepository;
  private readonly profiler: UserProfiler;

  constructor(generator: TokenGenerator, repository: UserRepository, profiler: UserProfiler) {
    super();
    this.tokenGenerator = generator;
    this.repository = repository;
    this.profiler = profiler;
  }

  async run(request: AuthUserRequest): Promise<AuthResponse> {
    const user = await this.repository.searchByEmail(
      new UserEmail(request.email)
    );
    if (user === null) {
      this.logError('Incorrect Email');
      throw new UserAuthFail(BAD_EMAIL_PASS_MESSAGE);
    }
    if (!compareSync(request.password, user.password.value)) {
      this.logError('Incorrect Password');
      throw new UserAuthFail(BAD_EMAIL_PASS_MESSAGE);
    }

    this.checkUserIsActive(user);

    const token = this.createToken(user);

    const profile = await this.profiler.run({userId: user.id.value, role: user.role.value});

    this.logInfo(`user ${user.email.value} authenticated`);

    return {
      userId: user.id.value,
      accessToken: token.value,
      email: request.email,
      userRole: user.role.value,
      avatar: user.avatar.value,
      profile
    };
  }

  private createToken(user: User): Token {
    const payload = {userId: user.id.value, role: user.role.value};
    return this.tokenGenerator.run(payload);
  }

  private checkUserIsActive(user: User) {
    if (!user.isActive.value) {
      this.logError(`the user ${user.email.value} is not active`);
      throw new AccountNotConfirmed(
        'You need activate your account before continuing'
      );
    }
  }
}
