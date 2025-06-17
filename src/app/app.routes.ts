import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProfileComponent} from './components/profile/profile.component';
import {MembershipComponent} from './components/membership/membership.component';
import {PaymentComponent} from './components/payment/payment.component';
import { PlansComparisonComponent } from './subscriptions/ui/plans-comparison/plans-comparison.component';
import { FaqComponent }             from './subscriptions/ui/faq/faq.component';
import { MembershipStatusComponent } from './subscriptions/ui/membership-status/membership-status.component';
import { CancelSubscriptionComponent } from './subscriptions/ui/cancel-subscription/cancel-subscription.component';
import { PaymentSuccessComponent } from './subscriptions/ui/payment-success/payment-success.component';
import { PaymentErrorComponent }   from './subscriptions/ui/payment-error/payment-error.component';


export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'membership', component: MembershipComponent },
  {path:'payment', component: PaymentComponent },

  {
    path: 'memberships',
    children: [
      { path: '', component: PlansComparisonComponent },
      { path: 'faq', component: FaqComponent },
    ]
  },
  {
    path: 'account/subscription',
    component: MembershipStatusComponent
  },
  {
    path: 'account/cancel',
    component: CancelSubscriptionComponent
  },
  { 
    path: 'payment/success', 
    component: PaymentSuccessComponent
  },
  { path: 'payment/error',   
    component: PaymentErrorComponent
  },

   { path: '**', redirectTo: 'login', pathMatch: 'full' }

];
