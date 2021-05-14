import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { UserId } from '../../../Shared/domain/Users/UserId';
import { UserEmail } from '../../domain/UserEmail';
import { User as MongoUser, UserSchema } from './mongo/user.model';
import { Schema } from 'mongoose';

export class MongoUserRepository extends MongoRepository<MongoUser> implements UserRepository {
  public async save(user: User): Promise<void> {
    await this.ensureEmailIndex();
    await this.persist(user.id.value, user);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const model = await this.model();

    const document = await model.findOne({_id: id.value}).exec();

    return document ? User.fromPrimitives({...document, id: document._id}) : null;
  }

  public async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const model = await this.model();

    const document = await model.findOne({email: email.value});

    return document
      ? User.fromPrimitives({...document, id: document._id})
      : null;
  }

  private async ensureEmailIndex() {
    const model = await this.model();
    await model.ensureIndexes({email: 1});
  }

  protected moduleName(): string {
    return 'User';
  }

  protected schema(): Schema {
    return UserSchema;
  }
}
