import { UserRepository } from '../domain/UserRepository';
import { CreateUserRequest } from './CreateUserRequest';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { UserIsActive } from '../domain/UserIsActive';
import { User } from '../domain/User';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserUpdatedAt } from '../domain/UserUpdatedAt';
import { UserCreatedAt } from '../domain/UserCreatedAt';
import { UserRole } from '../domain/UserRole';
import { UserEmailExists } from './UserEmailExists';
import { ConfirmationEmail } from '../domain/ConfirmationEmail';
import { Timestamp } from '../../Shared/domain/Timestamp';
import { UserRegistered } from '../domain/UserRegistered';
import { hashSync } from 'bcryptjs';
import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserAvatar } from '../domain/UserAvatar';

export class UserCreator extends ApplicationService {
  private repository: UserRepository;
  private confirmService: ConfirmationEmail;

  constructor(repository: UserRepository, confEmailService: ConfirmationEmail) {
    super();
    this.repository = repository;
    this.confirmService = confEmailService;
  }

  async run(request: CreateUserRequest): Promise<void> {
    await this.ensureUserNotExist(request.email);

    const passwordHashed = hashSync(request.password, 10);

    const user = User.create(
      new UserId(request.id),
      new UserEmail(request.email),
      new UserPassword(passwordHashed),
      new UserIsActive(request.isActive),
      new UserRole(request.role),
      new UserAvatar(),
      new UserRegistered(request.registered),
      new UserCreatedAt(Timestamp.now()),
      new UserUpdatedAt(Timestamp.now())
    );

    await this.repository.save(user);
    this.logInfo(`user ${user.email.value} created`);
    await this.confirmService.sendTo(user);
  }

  private async ensureUserNotExist(email: string) {
    const userEmail = new UserEmail(email);
    const result = await this.repository.searchByEmail(userEmail);
    const message = `The email ${email} has previously registered`;
    if (result !== null) {
      this.logError(message);
      throw new UserEmailExists(message);
    }
  }
}
