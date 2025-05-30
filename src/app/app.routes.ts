import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotificationsComponent} from './components/notifications/notifications.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
