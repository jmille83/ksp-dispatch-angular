import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningsComponent } from './views/openings/openings.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';
import { DispatchComponent } from './views/dispatch/dispatch.component';
import { KmcComponent } from './views/kmc/kmc.component';
import { UsefulLinksComponent } from './views/useful-links/useful-links.component';
import { DirectoryComponent } from './views/directory/directory.component';

const routes: Routes = [
  { path: '', redirectTo: '/dispatch', pathMatch: 'full' },
  { path: 'nowhere', canActivate: [ AuthGuard ], component: NoPermissionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dispatch', canActivate: [AuthGuard], component: DispatchComponent },
  { path: 'daily/:type/:peak', canActivate: [AuthGuard], component: OpeningsComponent },
  { path: 'kmc', canActivate: [AuthGuard], component: KmcComponent },
  { path: 'useful-links', canActivate: [AuthGuard], component: UsefulLinksComponent },
  { path: 'directory', canActivate: [AuthGuard], component: DirectoryComponent }
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
