import { CategoryDetails } from 'src/app/core/models/categories';

const TAG = 'Categories API';

export namespace CategoriesDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;
    }

    export class LoadAllSuccess {
        public static readonly type = `[${TAG}] Load All Success`;

        constructor(public data: CategoryDetails[]) { }
    }
}