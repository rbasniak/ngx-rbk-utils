import { CategoryCreation, CategoryDetails, CategoryUpdate } from 'src/app/core/models/categories';

const TAG = 'Categories API';

export namespace CategoriesManagerActions {
    export class Create {
        public static readonly type = `[${TAG}] Create Account`;

        constructor(public data: CategoryCreation) { }
    }

    export class CreateSuccess {
        public static readonly type = `[${TAG}] Create Account Success`;

        constructor(public data: CategoryDetails) { }
    }

    export class Update {
        public static readonly type = `[${TAG}] Update Account`;

        constructor(public data: CategoryUpdate) { }
    }

    export class UpdateSuccess {
        public static readonly type = `[${TAG}] Update Account Success`;

        constructor(public data: CategoryDetails) { }
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
