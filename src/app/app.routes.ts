import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MembershipComponent} from './components/membership/membership.component';
import {PaymentComponent} from './components/payment/payment.component';

import {NotificationsComponent} from './components/notifications/notifications.component';
import {PotsComponent} from './components/pots/pots.component';
import {CreateProfileComponent} from './components/create-profile/create-profile.component';
import {PotDetailsComponent} from './components/pot-details/pot-details.component';
import {EditPotComponent} from './components/edit-pot/edit-pot.component';
import {AddPotComponent} from './components/add-pot/add-pot.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery',component: PasswordRecoveryComponent},
  { path:'create-profile', component: CreateProfileComponent}, // Assuming create-profile redirects to register
  { path: 'profile', component: ProfileComponent },
  { path:'membership', component: MembershipComponent },
  { path:'payment', component: PaymentComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: "pots", component: PotsComponent },
  { path: "pot-details/:id", component: PotDetailsComponent },
  { path: "edit-pot/:id", component: EditPotComponent },
  { path: "add-pot", component: AddPotComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
