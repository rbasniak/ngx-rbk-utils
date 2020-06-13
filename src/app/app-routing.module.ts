import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretRouteComponent } from './secret-route.component';
import { RbkAuthGuard } from 'projects/ngx-rbk-utils/src/lib/auth/auth.guard';


const routes: Routes = [
  {
    path: 'secret',
    component: SecretRouteComponent,
    canActivate: [ RbkAuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
