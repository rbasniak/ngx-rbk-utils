import { SimpleNamedEntity } from 'ngx-smz';

const TAG = 'Account Types API';

export namespace AccountTypesDbActions {
    export class LoadAll {
        public static readonly type = `[${TAG}] Load All`;
    }

    export class LoadAllSuccess {
        public static readonly type = `[${TAG}] Load All Success`;

        constructor(public data: SimpleNamedEntity[]) { }
    }
}