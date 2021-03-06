import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecretRouteComponent } from './secret-route.component';
import { RbkAuthGuard } from 'projects/ngx-rbk-utils/src/lib/auth/auth.guard';
import { SuperSecretRouteComponent } from './super-secret-route.component';
import { RbkDatabaseStateGuard } from 'projects/ngx-rbk-utils/src/public-api';
import { DialogsComponent } from './dialogs.component';
import { NotSecretRouteComponent } from './not-secret-route.component';


const routes: Routes = [
  {
    path: 'secret',
    component: SecretRouteComponent,
    canActivate: [RbkAuthGuard],
    data: { title: 'Secret', breadcrumb: 'Secret' },
    children: [
      {
        path: 'top-secret',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: SuperSecretRouteComponent,
        data: {
          title: 'Top Secret', breadcrumb: 'Top Secret', requiredStates: ['accounts', 'transactions']
        },
      },
      {
        path: 'leaked-secret',
        canActivate: [RbkAuthGuard, RbkDatabaseStateGuard],
        component: SuperSecretRouteComponent,
        data: {
          title: 'Leaked Secret', breadcrumb: 'Leaked Secret', requiredStates: ['accounts', 'categories']
        },
      }
    ]
  },
  {
    path: 'dialogs',
    component: DialogsComponent,
    canActivate: [RbkDatabaseStateGuard],
    data: {
      title: 'Leaked Secret', breadcrumb: 'Leaked Secret', requiredStates: [],
      cacheStrategy: {
        reusableKeys: ['notsecret']
      },
      clearReusableRoutes: true
    },
  },
  {
    path: 'not-secret',
    component: NotSecretRouteComponent,
    canActivate: [RbkDatabaseStateGuard],
    data: {
      title: 'Not Secret', breadcrumb: 'Not Secret', requiredStates: [],
      cacheStrategy: {
        isReusable: true,
        reusableKeys: ['notsecret']
      },
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
