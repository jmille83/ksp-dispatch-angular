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
import { RosterComponent } from './views/roster/roster.component';
import { TenThirtythreeHomeComponent } from './views/ten-thirtythree-home/ten-thirtythree-home.component';
import { TenThirtythreeDetailComponent } from './views/ten-thirtythree-detail/ten-thirtythree-detail.component';
import { LiftEvacHomeComponent } from './views/lift-evac-home/lift-evac-home.component';
import { LiftEvacDetailComponent } from './views/lift-evac-detail/lift-evac-detail.component';
import { ReportingComponent } from './views/reporting/reporting.component';

const routes: Routes = [
  { path: '', redirectTo: '/dispatch', pathMatch: 'full' },
  { path: 'nowhere', canActivate: [ AuthGuard ], component: NoPermissionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dispatch', canActivate: [AuthGuard], component: DispatchComponent },
  { path: 'daily/:type/:peak', canActivate: [AuthGuard], component: OpeningsComponent },
  { path: 'kmc', canActivate: [AuthGuard], component: KmcComponent },
  { path: 'useful-links', canActivate: [AuthGuard], component: UsefulLinksComponent },
  { path: 'directory', canActivate: [AuthGuard], component: DirectoryComponent },
  { path: 'roster', canActivate: [AuthGuard], component: RosterComponent },
  { path: '1033', canActivate: [AuthGuard], component: TenThirtythreeHomeComponent },
  { path: '1033/:id', canActivate: [AuthGuard], component: TenThirtythreeDetailComponent },
  { path: 'lift-evac', canActivate: [AuthGuard], component: LiftEvacHomeComponent },
  { path: 'lift-evac/:id', canActivate: [AuthGuard], component: LiftEvacDetailComponent },
  { path: 'reporting', canActivate: [AuthGuard], component: ReportingComponent }
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
