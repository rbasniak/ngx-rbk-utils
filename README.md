# ngx-rbk-utils
Angular infrastructure services for NGXS stores, global error handling, global loader, and more.

Actions de load database tem que ter Success

disparar this.store.dispatch(new ApplicationActions.NgRxInitialized()); no construtor do app module

Adicionar o TaoastModule e <p-toast>

TODO: A aplicação tem que ser inicializada antes do NGXS
TODO: Não pode disparar nenhuma action antes do NGXS ter sido inicializado na aplicação cliente

explicar do token