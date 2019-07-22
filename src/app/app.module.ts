import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule,
          MatSidenavModule, MatIconModule, MatListModule, MatDatepickerModule,
          MatCheckboxModule, MatDialogModule, MatMenuModule } from '@angular/material';
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
import { PatrollerFilterPipe } from './utils/patroller-filter.pipe';
import { SideMenuComponent } from './views/side-menu/side-menu.component';
import { OpeningsComponent } from './views/openings/openings.component';
import { OpeningsService } from './services/openings.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';
import { RecordDetailDialogComponent } from './views/record-detail-dialog/record-detail-dialog.component';
import { RecordDeleteDialogComponent } from './views/record-delete-dialog/record-delete-dialog.component';
import { RecordEditTimeDialogComponent } from './views/record-edit-time-dialog/record-edit-time-dialog.component';
import { OpeningFilterPipe } from './utils/opening-filter.pipe';
import { NotesFilterPipe } from './utils/notes-filter.pipe';

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
    RecordDetailDialogComponent,
    RecordDeleteDialogComponent,
    RecordEditTimeDialogComponent,
    OpeningFilterPipe,
    NotesFilterPipe
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
    MatCheckboxModule, MatDialogModule, MatMenuModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RecordDetailDialogComponent,
    RecordDeleteDialogComponent,
    RecordEditTimeDialogComponent
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
export class AppModule {}
