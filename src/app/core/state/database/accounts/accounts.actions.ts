import { AccountDetails } from 'src/app/core/models/accounts';

const TAG = 'Accounts API';

export namespace AccountsDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;
    }

    export class LoadAllSuccess {
        public static readonly type = `[${TAG}] Load All Success`;

        constructor(public data: AccountDetails[]) { }
    }
}