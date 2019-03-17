import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule,
          MatSidenavModule, MatIconModule, MatListModule, MatDatepickerModule,
          MatCheckboxModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'

import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { RecordsService } from './services/records.service';
import { RecordsComponent } from './views/records/records.component';
import { AppRoutingModule } from './app-routing.module';
import { DispatchComponent } from './views/dispatch/dispatch.component';
import { RecordDetailComponent } from './views/record-detail/record-detail.component';
import { NotesComponent } from './views/notes/notes.component';
import { PatrollerService } from './services/patroller.service';
import { PatrollerFilterPipe } from './patroller-filter.pipe';
import { SideMenuComponent } from './views/side-menu/side-menu.component';
import { OpeningsComponent } from './views/openings/openings.component';
import { OpeningsService } from './services/openings.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    DispatchComponent,
    RecordDetailComponent,
    NotesComponent,
    PatrollerFilterPipe,
    SideMenuComponent,
    OpeningsComponent,
    LoginComponent,
    NoPermissionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule, 
    MatSidenavModule, MatIconModule, MatListModule, MatDatepickerModule,
    MatCheckboxModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    RecordsService,
    PatrollerService,
    OpeningsService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
