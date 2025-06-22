import { Routes } from '@angular/router';
import {LoginComponent} from './iam/presentation/login/login.component';
import {RegisterComponent} from './iam/presentation/register/register.component';
import {PasswordRecoveryComponent} from './iam/presentation/password-recovery/password-recovery.component';
import {ProfileComponent} from './profile_and_preferences/presentation/profile/profile.component';
import {MembershipComponent} from './components/membership/membership.component';
import {PaymentComponent} from './components/payment/payment.component';

import {NotificationsComponent} from './components/notifications/notifications.component';
import {PotsComponent} from './components/pots/pots.component';
import {CreateProfileComponent} from './profile_and_preferences/presentation/create-profile/create-profile.component';
import {PaymentDoneComponent} from './components/payment-done/payment-done.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery',component: PasswordRecoveryComponent},
  { path:'create-profile', component: CreateProfileComponent},
  { path: 'profile', component: ProfileComponent },
  { path:'membership', component: MembershipComponent },
  { path:'payment', component: PaymentComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: "pots", component: PotsComponent },
  { path: "payment-done", component: PaymentDoneComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
