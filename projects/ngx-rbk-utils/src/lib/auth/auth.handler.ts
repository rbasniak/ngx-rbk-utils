// import { Injectable } from '@angular/core';
// import { Store } from '@ngxs/store';
// import { Observable } from 'rxjs/internal/Observable';
// import { map } from 'rxjs/internal/operators/map';
// import { catchError } from 'rxjs/internal/operators/catchError';
// import { of } from 'rxjs/internal/observable/of';

// @Injectable({ providedIn: 'root' })
// export class AuthHandler {
//     private decoder: JwtHelperService;
//     constructor(private authService: AuthService, private store: Store) {
//         this.decoder = new JwtHelperService();
//     }

//     public getToken(): Observable<string> {
//         const token = this.store.selectSnapshot(AuthSelectors.accessToken);

//         const isTokenExpired = this.decoder.isTokenExpired(token);

//         if (!isTokenExpired) {
//             return of(token);
//         }

//         return this.refreshToken();
//     }

//     public refreshToken(): Observable<string> {
//         const refreshToken = this.store.selectSnapshot(AuthSelectors.refreshToken);

//         console.warn('Token expired, trying to refresh it');

//         return this.authService.refreshToken(refreshToken)
//             .pipe(
//                 // share(), // YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
//                 map((response: LoginResponse) => {
//                     console.warn('Token successfully refreshed');

//                     // store the new tokens
//                     this.store.dispatch(new AuthActions.RemoteLoginSuccess(response));

//                     return response.token;
//                 }),
//                 catchError(error => {
//                     console.warn('Couldn\'t refresh the access token');
//                     return of(null);
//                 })
//             );
//     }
// }

