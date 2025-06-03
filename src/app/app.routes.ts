import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PotsComponent} from './components/pots/pots.component';
import {CreateProfileComponent} from './components/create-profile/create-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery',component: PasswordRecoveryComponent},
  {path:'create-profile', component: CreateProfileComponent}, // Assuming create-profile redirects to register
  { path: 'profile', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: "pots", component: PotsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
