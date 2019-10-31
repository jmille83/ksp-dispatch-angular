import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule,
          MatSidenavModule, MatIconModule, MatListModule, MatDatepickerModule,
          MatCheckboxModule, MatDialogModule, MatMenuModule, MatTableModule, MatSlideToggleModule, MatChipsModule, MatAutocompleteModule, MatGridListModule, MatCardModule, MatTooltipModule, MatSnackBarModule, MatExpansionModule, MatButtonToggleModule } from '@angular/material';
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
import { PatrollerFilterPipe } from './utils/patroller-filter.pipe';
import { SideMenuComponent } from './views/side-menu/side-menu.component';
import { OpeningsComponent } from './views/openings/openings.component';
import { OpeningsService } from './services/openings.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './views/login/login.component';
import { NoPermissionComponent } from './views/no-permission/no-permission.component';
import { RecordDetailDialogComponent } from './views/dialogs/record-detail-dialog/record-detail-dialog.component';
import { RecordDeleteDialogComponent } from './views/dialogs/record-delete-dialog/record-delete-dialog.component';
import { RecordEditTimeDialogComponent } from './views/dialogs/record-edit-time-dialog/record-edit-time-dialog.component';
import { OpeningFilterPipe } from './utils/opening-filter.pipe';
import { NotesFilterPipe } from './utils/notes-filter.pipe';
import { KmcComponent } from './views/kmc/kmc.component';
import { UsefulLinksComponent } from './views/useful-links/useful-links.component';
import { LinksService } from './services/links.service';
import { DirectoryComponent } from './views/directory/directory.component';
import { LinkEditComponent } from './views/dialogs/link-edit/link-edit.component';
import { ContactEditComponent } from './views/dialogs/contact-edit/contact-edit.component';
import { OpeningEditComponent } from './views/dialogs/opening-edit/opening-edit.component';
import { PickFrontsideSweepComponent } from './views/dialogs/pick-frontside-sweep/pick-frontside-sweep.component';
import { RosterComponent } from './views/roster/roster.component';
import { RosterEditComponent } from './views/dialogs/roster-edit/roster-edit.component';
import { TransactionService } from './services/transaction.service';
import { TenThirtythreeHomeComponent } from './views/ten-thirtythree-home/ten-thirtythree-home.component';
import { TenThirtythreeDetailComponent } from './views/ten-thirtythree-detail/ten-thirtythree-detail.component';
import { LiftEvacHomeComponent } from './views/lift-evac-home/lift-evac-home.component';
import { LiftEvacDetailComponent } from './views/lift-evac-detail/lift-evac-detail.component';
import { LiftEvacNewComponent } from './views/dialogs/lift-evac-new/lift-evac-new.component';
import { ReportingComponent } from './views/reporting/reporting.component';

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
    NotesFilterPipe,
    KmcComponent,
    UsefulLinksComponent,
    DirectoryComponent,
    LinkEditComponent,
    ContactEditComponent,
    OpeningEditComponent,
    PickFrontsideSweepComponent,
    RosterComponent,
    RosterEditComponent,
    TenThirtythreeHomeComponent,
    TenThirtythreeDetailComponent,
    LiftEvacHomeComponent,
    LiftEvacDetailComponent,
    LiftEvacNewComponent,
    ReportingComponent
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
    MatCheckboxModule, MatDialogModule, MatMenuModule, MatTableModule, MatSlideToggleModule,
    MatMomentDateModule, MatChipsModule, MatAutocompleteModule, MatGridListModule, MatCardModule,
    MatTooltipModule, MatSnackBarModule, MatExpansionModule, MatButtonToggleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RecordDetailDialogComponent,
    RecordDeleteDialogComponent,
    RecordEditTimeDialogComponent,
    LinkEditComponent,
    ContactEditComponent,
    OpeningEditComponent,
    PickFrontsideSweepComponent,
    RosterEditComponent,
    LiftEvacNewComponent
  ],
  providers: [
    RecordsService,
    OpeningsService,
    AuthService,
    AuthGuard,
    LinksService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
