import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MembershipComponent} from './components/membership/membership.component';
import {PaymentComponent} from './components/payment/payment.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'membership', component: MembershipComponent },
  {path:'payment', component: PaymentComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
