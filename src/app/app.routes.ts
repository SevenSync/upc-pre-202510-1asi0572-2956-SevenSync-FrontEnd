import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PotsComponent} from './components/pots/pots.component';
import {MembershipsComponent} from './components/memberships/memberships.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: "pots", component: PotsComponent },
  { path: "memberships", component: MembershipsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
