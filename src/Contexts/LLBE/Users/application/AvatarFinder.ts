import { ApplicationService } from '../../../Shared/domain/ApplicationService';
import { UserId } from '../../Shared/domain/Users/UserId';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import path from 'path';
import fs from 'fs-extra';
import {UserAvatar} from "../domain/UserAvatar";
import {UserAvatarNotFound} from "../domain/UserAvatarNotFound";

export class AvatarFinder extends ApplicationService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    super();
    this.repository = repository;
  }

  public async run(userId: UserId): Promise<UserAvatar> {
    const user = (await this.repository.search(userId)) as User;
    const avatarId = user.avatar.value;
    if (avatarId === '') {
      this.logInfo(`not founded avatar of ${user.email}`);
      throw new UserAvatarNotFound('Avatar not found');
    }
    this.logInfo(`founded avatar of user ${user.email}`);
    return user.avatar;
  }
}
