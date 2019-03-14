import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningsComponent } from './views/openings/openings.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { PatrolGuard } from './services/patrol-guard.service';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';
import { DispatchComponent } from './views/dispatch/dispatch.component';

const routes: Routes = [
  { path: '', redirectTo: 'dispatch', pathMatch: 'full' },
  { path: 'nowhere', canActivate: [ AuthGuard ], component: NoPermissionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dispatch', canActivate: [AuthGuard, PatrolGuard ], component: DispatchComponent },
  { path: 'openings/:peak', canActivate: [AuthGuard, PatrolGuard], component: OpeningsComponent }
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
