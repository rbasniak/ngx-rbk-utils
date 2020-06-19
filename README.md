# ngx-rbk-utils
Angular infrastructure services for NGXS stores, global error handling, global loader, and more.

Actions de load database tem que ter Success

disparar this.store.dispatch(new ApplicationActions.NgRxInitialized()); no construtor do app module

Adicionar o TaoastModule e <p-toast>

TODO: A aplicação tem que ser inicializada antes do NGXS
TODO: Não pode disparar nenhuma action antes do NGXS ter sido inicializado na aplicação cliente

explicar do token

Colcoar o smz-genral-dialog no appcomponent

TODO: rever o auth guard para considerar os claims do usuário
TODO: colocar redirecionamento apos o login na library
TODO: falar da tipagem da store de database e feature

TODO: titulos do toast nào estao certos de acordo com o config




// TODO: remover quando ngx-rbk-utils estiver consolidado no projeto

// import { Store, Observable, map } from 'imports/core.imports';
// import { AppRoutes } from 'app/@shared/constants/routes';
// import { AuthenticationState } from 'imports/state.imports';
// import { AuthenticationService } from './authentication.service';
// import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
// import { DialogsService } from 'app/@shared/components/ui/dialogs/services/dialogs.service';
// import { MatDialog } from '@angular/material/dialog';
// import { Injectable } from '@angular/core';


// @Injectable()
// export class RbkAuthGuard implements CanActivate
// {
//     constructor(private authentication: AuthenticationService, private router: Router, private store: Store<AuthenticationState>, private dialogsService: DialogsService, private dialog: MatDialog) { }

//     public canActivate(route: ActivatedRouteSnapshot): Observable<boolean>
//     {
//         // console.log(route);
//         const token$ = this.authentication.getToken();

//         return token$.pipe(
//             map(token =>
//             {
//                 if (token == null || token === '')
//                 {
//                     this.dialog.closeAll();
//                     this.router.navigate(AppRoutes.LOGIN);

//                     return false;
//                 }
//                 else
//                 {
//                     const roles = route.data['claim'] as string;
//                     const canAccess = this.authentication.canAccess(roles);
//                     // console.log('roles', roles);

//                     if (roles == null || canAccess)
//                     {
//                         return true;
//                     }
//                     else
//                     {

//                         this.dialogsService.showMessage('SEM ACESSO', 'Você não possui autorização para acessar esta rota. Caso necessite acessa-la, entre em contato com seu Supervisor.');

//                         this.router.navigate(AppRoutes.NO_ACCESS_ERROR_PAGE);

//                         return false;
//                     }
//                 }
//             }),
//         );

//         // TODO: Verificar se o token está expirado
//     }

// }
