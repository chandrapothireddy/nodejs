import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from '../register_app/components/register';
import { LoginComponent } from '../login/components/login';
import { DashboardComponent } from '../dashboard/components/dashboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './services/data.service';
const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];
@NgModule({
  declarations: [
    AppComponent,RegisterComponent,LoginComponent,DashboardComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,
	 RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [DataService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }