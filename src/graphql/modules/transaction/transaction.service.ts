import { TransactionModel } from './transaction.model';

import { CrudService } from '../../../base/crudService';

class TransactionService extends CrudService<typeof TransactionModel> {
    constructor() {
        super(TransactionModel);
    }
}

const transactionService = new TransactionService();

export { transactionService };
