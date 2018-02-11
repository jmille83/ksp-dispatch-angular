import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { environment } from '../environments/environment'

import { AppComponent } from './app.component';
import { RecordsService } from './records.service';
import { RecordsComponent } from './records/records.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    RecordsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    RecordsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
