import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api/message';

export namespace ToastActions {
    export class SendToastMessage {
        public static readonly type = '[Application] Show General Toast Message';
        constructor(public message: Partial<Message>) { }
    }

    export class SendToastSuccessMessage {
        public static readonly type = '[Application] Show Success Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class SendToastInfoMessage {
        public static readonly type = '[Application] Show Info Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class SendToastWarningMessage {
        public static readonly type = '[Application] Show Warning Toast Message';
        constructor(public message: string, public title?: string) { }
    }

    export class SendToastErrorMessage {
        public static readonly type = '[Application] Show Error Toast Message';
        constructor(public message: string, public title?: string) { }
    }
}

