import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { User } from '../../domain/User';
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../../Shared/domain/Users/UserId";
import { UserEmail } from "../../domain/UserEmail";

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {

  public async save(user: User): Promise<void> {
    await this.ensureEmailIndex();
    await this.persist(user.id.value, user);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const collection = await this.collection();

    const document = await collection.findOne({_id: id.value});

    return document ? User.fromPrimitives({...document, id: id.value}) : null;
  }

  public async searchByEmail(email:UserEmail): Promise<Nullable<User>> {
    const collection = await this.collection();

    const document = await collection.findOne({email: email.value});

    return document ? User.fromPrimitives({...document, id: document._id}) : null;
  }



  private async ensureEmailIndex() {
        const collection = await this.collection();
        await collection.createIndex({ email: 1}, { unique: true });
  }

  protected moduleName(): string {
    return 'users';
  }
}
