import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningsComponent } from './views/openings/openings.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';
import { DispatchComponent } from './views/dispatch/dispatch.component';
import { ClosingsComponent } from './views/closings/closings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dispatch', pathMatch: 'full' },
  { path: 'nowhere', canActivate: [ AuthGuard ], component: NoPermissionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dispatch', canActivate: [AuthGuard], component: DispatchComponent },
  { path: 'openings/:peak', canActivate: [AuthGuard], component: OpeningsComponent },
  { path: 'closings/:peak', canActivate: [AuthGuard], component: ClosingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
