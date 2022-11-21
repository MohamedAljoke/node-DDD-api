import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(addAccount: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(addAccount);
    const resultId = result.insertedId.toString();
    const account = { ...addAccount, id: resultId };
    delete account['_id'];
    return new Promise((resolve) => resolve(account));
  }
}
