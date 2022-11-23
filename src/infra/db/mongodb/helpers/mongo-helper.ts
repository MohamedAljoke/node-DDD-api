import { Collection, MongoClient } from 'mongodb';
export const MongoHelper = {
  client: MongoClient,
  uri: '',
  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },
  async desconnect(): Promise<void> {
    this.client.close();
    this.client = null;
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client || !this.client.isConnected) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(name);
  },
};
