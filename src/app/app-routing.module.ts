import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretRouteComponent } from './secret-route.component';
import { RbkAuthGuard } from 'projects/ngx-rbk-utils/src/lib/auth/auth.guard';
import { SuperSecretRouteComponent } from './super-secret-route.component';


const routes: Routes = [
  {
    path: 'secret',
    component: SecretRouteComponent,
    canActivate: [ RbkAuthGuard ],
    data: { title: 'Secret', breadcrumb: 'Secret', claim: 'CAN_EDIT_TEMPLATE' },
    children: [
      {
        path: 'top-secret',
        canActivate: [ RbkAuthGuard ],
        component: SuperSecretRouteComponent,
        data: { title: 'Top Secret', breadcrumb: 'Top Secret', claim: 'CAN_EDIT_BLOCK_XXXX' },
      },
      {
        path: 'leaked-secret',
        canActivate: [ RbkAuthGuard ],
        component: SuperSecretRouteComponent,
        data: { title: 'Leaked Secret', breadcrumb: 'Leaked Secret', claim: 'CAN_EDIT_BLOCK' },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
