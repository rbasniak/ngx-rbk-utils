import { HttpErrorResponse } from '@angular/common/http';

export class CustomError {
    public messages: string[];

    public redirectTo: string;

    public severity: string;

    public static fromApiResponse(state: HttpErrorResponse): CustomError {
        let severity = 'error';

        if (state.status === 400 || state.status === 401 || state.status === 403) {
            severity = 'warning';
        }

        const error: CustomError = { messages: state.error, redirectTo: null, severity };
        return error;
    }

    public static fromExceptionResponse(state: HttpErrorResponse): CustomError {
        const error: CustomError = { messages: [], redirectTo: null, severity: 'error' };

        if (typeof state.error === 'string' || state.error instanceof String) {
            error.messages.push(`${state.error}`);
        }
        else if (state.error != null && state.error.length > 0) {
            error.messages = state.error;
        }
        else {
            error.messages.push('Erro interno no servidor.');
        }

        return error;
    }

    public static fromSingleError(message: string, severity: string, redirectTo: string = null): CustomError {
        return { messages: [message], redirectTo, severity };
    }

    public static empty(): CustomError {
        return { messages: [], redirectTo: null, severity: 'error' };
    }
}

export class HttpErrorHandler {
    // TODO: Fazer throw error no login por exemplo e ver porque está entrando nos ifs do status
    public static handle(response: any): CustomError {
        if (response instanceof HttpErrorResponse) {
            if (response.status === 400) {
                // Bad Request, ModelState, client
                return CustomError.fromApiResponse(response);
            }
            else if (response.status === 500) {
                // Internal Server Error, ModelState, server
                return CustomError.fromExceptionResponse(response);
            }
            else if (response.status === 401) {
                // Unauthorized, not authenticated
                if (typeof response.error === 'string' || response.error instanceof String) {
                    return CustomError.fromSingleError(response.error as string, 'warning', 'login');
                }
                else {
                    return CustomError.fromSingleError('Houve um problema na autenticação com o servidor.', 'warning', 'login');
                }
            }
            else if (response.status === 403) {
                // Forbidden, needs more privilegies
                return CustomError.fromSingleError('Nível de acesso insuficiente para o recurso solicitado.', 'warning');
            }
            else if (response.status === 404) {
                // Not found
                return CustomError.fromSingleError('Não foi possível encontrar o recurso solicitado no servidor.', 'error');
            }
            else if (response.status === 0) {
                // Unknown error
                return CustomError.fromSingleError('Erro de comunicação com o servidor.', 'error');
            }
            else {
                // Error has a code, but it was not handled
                return CustomError.fromSingleError(`Código de erro não tratado: ${response.status}.`, 'error');
            }
        }
        else {
            console.error('response', response);
            return CustomError.fromSingleError('Erro desconhecido na conexão com o servidor.', 'error');
        }
    }
}
