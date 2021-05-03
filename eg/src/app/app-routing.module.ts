import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {Page404Component} from './components/page404/page404.component';
import {LoginComponent} from './components/login/login.component';
import {ManagerComponent} from './components/manager/manager.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PriviligesComponent} from './components/priviliges/priviliges.component';
import {RolComponent} from './components/rol/rol.component';
import {ConsultsComponent} from './components/consults/consults.component';
import {MaintenanceComponent} from './components/maintenance/maintenance.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'priviliges', component: PriviligesComponent },
  { path: 'rol', component: RolComponent },
  { path: 'consultas', component: ConsultsComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '**', component: Page404Component },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
