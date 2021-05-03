import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { FooterComponent } from './share/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ManagerComponent } from './components/manager/manager.component';
import { Page404Component } from './components/page404/page404.component';
import { PriviligesComponent } from './components/priviliges/priviliges.component';
import { RolComponent } from './components/rol/rol.component';
import {SplashScreenComponent} from './components/splash-screen/splash-screen.component';

import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { NavbarGeneralComponent } from './share/navbar-general/navbar-general.component';
import { ConsultsComponent } from './components/consults/consults.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SplashScreenComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    ManagerComponent,
    Page404Component,
    PriviligesComponent,
    RolComponent,
    NavbarGeneralComponent,
    ConsultsComponent,
    MaintenanceComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatDividerModule,
        MatToolbarModule,
        MatGridListModule,
        MatInputModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatSelectModule,
        ReactiveFormsModule,
        FormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
