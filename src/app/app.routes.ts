import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MembershipComponent } from './components/membership/membership.component';
import { PaymentComponent } from './components/payment/payment.component';

import { PlansPageComponent } from './subscriptions/pages/plans-page/plans-page.component';
import { FaqPageComponent } from './subscriptions/pages/faq-page/faq-page.component';
import { MembershipStatusPageComponent } from './subscriptions/pages/membership-status-page/membership-status-page.component';
import { CancelSubscriptionPageComponent } from './subscriptions/pages/cancel-subscription-page/cancel-subscription-page.component';
import { PaymentSuccessPageComponent } from './subscriptions/pages/payment-success-page/payment-success-page.component';
import { PaymentErrorPageComponent } from './subscriptions/pages/payment-error-page/payment-error-page.component';

export const routes: Routes = [
  // Rutas principales de autenticación y perfil
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile',  component: ProfileComponent },

  // Rutas legacy (si todavía las usas)
  { path: 'membership', component: MembershipComponent },
  { path: 'payment',    component: PaymentComponent },

  // Bounded Context: Subscriptions & Payments
  {
    path: 'memberships',
    children: [
      { path: '',    component: PlansPageComponent },
      { path: 'faq', component: FaqPageComponent }
    ]
  },
  { path: 'account/subscription', component: MembershipStatusPageComponent },
  { path: 'account/cancel',       component: CancelSubscriptionPageComponent },

  // Rutas de retorno de Stripe
  { path: 'payment/success', component: PaymentSuccessPageComponent },
  { path: 'payment/error',   component: PaymentErrorPageComponent },

  // Catch-all: redirige a login
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
