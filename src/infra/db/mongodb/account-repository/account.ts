import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { changeMongoDashedIdToId } from '../helpers/account-mapper';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(addAccount);
    const account = changeMongoDashedIdToId<AccountModel>(addAccount);
    return new Promise((resolve) => resolve(account));
  }
}
