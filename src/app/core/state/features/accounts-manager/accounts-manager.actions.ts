import { AccountDetails, AccountUpdate, AccountCreation } from 'src/app/core/models/accounts';

const TAG = 'Accounts API';

export namespace AccountsManagerActions {
    export class Create {
        public static readonly type = `[${TAG}] Create Account`;

        constructor(public data: AccountCreation) { }
    }

    export class CreateSuccess {
        public static readonly type = `[${TAG}] Create Account Success`;

        constructor(public data: AccountDetails) { }
    }

    export class Update {
        public static readonly type = `[${TAG}] Update Account`;

        constructor(public data: AccountUpdate) { }
    }

    export class UpdateSuccess {
        public static readonly type = `[${TAG}] Update Account Success`;

        constructor(public data: AccountDetails) { }
    }

    export class Delete {
        public static readonly type = `[${TAG}] Delete Account`;

        constructor(public id: string) { }
    }

    export class DeleteSuccess {
        public static readonly type = `[${TAG}] Delete Account Success`;
        constructor(public id: string) { }
    }
}
