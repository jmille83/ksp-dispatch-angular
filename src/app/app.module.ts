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

import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { RecordsService } from './records.service';
import { RecordsComponent } from './records/records.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';
import { NotesComponent } from './notes/notes.component';
import { PatrollerService } from './patroller.service';
import { PatrollerFilterPipe } from './patroller-filter.pipe';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { OpeningsComponent } from './openings/openings.component';
import { OpeningsService } from './openings.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    DashboardComponent,
    RecordDetailComponent,
    NotesComponent,
    PatrollerFilterPipe,
    SideMenuComponent,
    OpeningsComponent
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
    BrowserAnimationsModule
  ],
  providers: [
    RecordsService,
    PatrollerService,
    OpeningsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
