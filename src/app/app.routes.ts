import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PotsComponent} from './components/pots/pots.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery',component: PasswordRecoveryComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: "pots", component: PotsComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
