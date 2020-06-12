import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api/message';

export namespace ApplicationActions {
    export class HandleHttpErrorWithDialog {
        public static readonly type = '[Application] Handle Http Error With Dialog';

        constructor(public error: HttpErrorResponse) { }
    }

    export class HandleHttpErrorWithToast {
        public static readonly type = '[Application] Handle Http Error With Toast';

        constructor(public error: HttpErrorResponse) { }
    }

    export class StartGlobalLoading {
        public static readonly type = '[Application] Start Global Loader';
    }

    export class StopGlobalLoading {
        public static readonly type = '[Application] Stop Global Loader';
    }

    export class NgRxInitialized {
        public static readonly type = '[Application] NgRx Initialized on Client Application';
        constructor() {}
    }

    export class DatabaseStatesInitialized {
        public static readonly type = '[Application] Database States Initialized';
    }

    export class PushLocalLoading {
        public static readonly type = '[Application] Push Local Loading Tag';
        constructor(public tag: string) {}
    }

    export class PopLocalLoading {
        public static readonly type = '[Application] Pop Local Loading Tag';
        constructor(public tag: string) {}
    }
}

