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

export class UserCreator {
  private repository: UserRepository;
  private confirmService: ConfirmationEmail;

  constructor(repository: UserRepository, confEmailService: ConfirmationEmail) {
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
      new UserRegistered(request.registered),
      new UserCreatedAt(Timestamp.now()),
      new UserUpdatedAt(Timestamp.now())
    );

    await this.repository.save(user);
    await this.confirmService.sendTo(user);
  }

  private async ensureUserNotExist(email: string) {
    const userEmail = new UserEmail(email);
    const result = await this.repository.searchByEmail(userEmail);
    if (result !== null) {
      throw new UserEmailExists(`The email ${email} has previously registered`);
    }
  }
}
