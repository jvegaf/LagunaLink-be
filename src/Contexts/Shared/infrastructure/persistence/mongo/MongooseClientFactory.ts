import { Mongoose as MongooseClient } from 'mongoose';
import config from '../../../../../app/lagunalink_be/config/config';
import { Nullable } from '../../../domain/Nullable';

export class MongooseClientFactory {
  private static clients: { [key: string]: MongooseClient } = {};

  static async createClient(contextName: string): Promise<MongooseClient> {
    let client = MongooseClientFactory.getClient(contextName);

    if (!client) {
      client = await MongooseClientFactory.createAndConnectClient();

      MongooseClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<MongooseClient> {
    return MongooseClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(): Promise<MongooseClient> {
    const client = new MongooseClient();

    await client.connect(config.get('mongo.url'), { useUnifiedTopology: true, ignoreUndefined: true });

    return client;
  }

  private static registerClient(client: MongooseClient, contextName: string): void {
    MongooseClientFactory.clients[contextName] = client;
  }
}
