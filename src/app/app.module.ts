import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

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

@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    DashboardComponent,
    RecordDetailComponent,
    NotesComponent,
    PatrollerFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatButtonModule, MatInputModule, MatRadioModule, MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    RecordsService,
    PatrollerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
