
import { TransactionDetails } from 'src/app/core/models/transactions';

const TAG = 'Transactions API';

export namespace TransactionsDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;
    }

    export class LoadAllSuccess {
        public static readonly type = `[${TAG}] Load All Success`;

        constructor(public data: TransactionDetails[]) { }
    }
}