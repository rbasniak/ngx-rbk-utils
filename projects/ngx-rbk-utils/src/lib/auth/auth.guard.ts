// import { Injectable } from '@angular/core';
// import { Store } from '@ngxs/store';
// import { CanActivate } from '@angular/router';
// import { Navigate } from '@ngxs/router-plugin';

// @Injectable({ providedIn: 'root' })
// export class RbkAuthGuard implements CanActivate {
//     constructor(private store: Store) { }

//     public async canActivate(): Promise<boolean> {

//         let isAuthenticated = this.store.selectSnapshot(AuthSelectors.isAuthenticated);

//         if (!isAuthenticated) {
//             try {
//                 console.log('User not authenticated, trying to login from localstorage...');

//                 await this.store.dispatch(new AuthActions.LocalLogin()).toPromise();

//                 isAuthenticated = this.store.selectSnapshot(AuthSelectors.isAuthenticated);

//                 if (!isAuthenticated) {
//                     console.log('User not authenticated, redirecting to login...');

//                     this.store.dispatch(new Navigate(['/login']));

//                     return false;
//                 }
//             }
//             catch (ex) {

//             }
//         }

//         return isAuthenticated;
//     }
// }