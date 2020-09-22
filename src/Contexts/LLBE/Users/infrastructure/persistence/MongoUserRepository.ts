import {Nullable} from '../../../../Shared/domain/Nullable';
import {MongoRepository} from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import {User} from '../../domain/User';
import {UserRepository} from "../../domain/UserRepository";
import { UserId } from "../../../Shared/domain/Users/UserId";

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
    public save(user: User): Promise<void> {
        return this.persist(
            user.id.value, user);
    }

    public async search(id: UserId): Promise<Nullable<User>> {
        const collection = await this.collection();

        const document = await collection.findOne({_id: id.value});

        return document ? User.fromPrimitives({...document, id: id.value}) : null;
    }

    protected moduleName(): string {
        return 'users';
    }
}
