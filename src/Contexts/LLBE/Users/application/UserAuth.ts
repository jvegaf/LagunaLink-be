import { Encoder } from '../../../Shared/application/encoder/Encoder';
import { UserRepository } from '../domain/UserRepository';
import { Updater } from './UserUpdater';
import { AuthUserRequest } from './AuthUserRequest';
import { UserEmail } from '../domain/UserEmail';
import { UserAuthFail } from './UserAuthFail';
import { Payload } from '../../../Shared/application/encoder/Payload';
import { AuthResponse } from './AuthResponse';
import { AccountNotConfirmed } from './AccountNotConfirmed';

export class UserAuth {
  private readonly encoder: Encoder;
  private readonly repository: UserRepository;
  private updater: Updater;

  constructor(encoder: Encoder, repository: UserRepository, updater: Updater) {
    this.updater = updater;
    this.repository = repository;
    this.encoder = encoder;
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
    let subject = '';
    let message = 'Register not complete';
    if (user.registered.value) {
      subject = 'Registered';
      message = 'Registered';
    }
    const payload = new Payload(subject, user.id.value, user.role.value);

    const token = this.encoder.encode(payload);
    return new AuthResponse(message, token.value);
  }
}
