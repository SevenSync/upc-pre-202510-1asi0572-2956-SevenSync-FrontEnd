import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'password-recovery',component: PasswordRecoveryComponent},

  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
