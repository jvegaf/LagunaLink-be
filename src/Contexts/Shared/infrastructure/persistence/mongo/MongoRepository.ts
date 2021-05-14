import { Model, Mongoose as MongooseClient, Schema } from 'mongoose';
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class MongoRepository<T extends MongoDocument> {
  constructor(private _client: Promise<MongooseClient>) {}

  protected abstract moduleName(): string;
  protected abstract schema(): Schema;

  protected client(): Promise<MongooseClient> {
    return this._client;
  }

  protected async model(): Promise<Model<T>> {
    return (await this._client).model<T>(this.moduleName(), this.schema());
  }

  protected async persist(id: string, aggregateRoot: AggregateRoot ): Promise<void> {
    const model = await this.model();

    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined,
    };

    await model.replaceOne(
      { _id: document._id },
      document,
      { upsert: true }
    );
  }

  protected async delete(id: string): Promise<void> {
    const model = await this.model();

    await model.remove({ _id: id });
  }
}
