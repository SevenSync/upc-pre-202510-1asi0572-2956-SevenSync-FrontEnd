// app.routes.ts
import { Routes } from '@angular/router';

// IAM Components
import { LoginComponent } from './iam/pages/login/login.component';
import { RegisterComponent } from './iam/pages/register/register.component';
import { PasswordRecoveryComponent } from './iam/pages/password-recovery/password-recovery.component';

// Profiles Components
import { ProfileComponent } from './profiles/pages/profile/profile.component';
import { CreateProfileComponent } from './profiles/pages/create-profile/create-profile.component';

// ARM Components (Pots)
import { PotsComponent } from './arm/pages/pots/pots.component';

// Subscriptions Components
import { MembershipComponent } from './subscriptions/pages/membership/membership.component';
import { PaymentComponent } from './subscriptions/pages/payment/payment.component';
import { PaymentDoneComponent } from './subscriptions/pages/payment-done/payment-done.component';

// Notifications Components
import { NotificationsComponent } from './notifications/pages/notifications/notifications.component';

// Guards
import { authenticationGuard, simpleAuthGuard } from './iam/services/authentication.guard';

export const routes: Routes = [
  // Public routes (no authentication required)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },

  // Protected routes that only require authentication (no profile check)
  {
    path: 'create-profile',
    component: CreateProfileComponent,
    canActivate: [simpleAuthGuard]
  },

  // Protected routes that require authentication AND profile
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'pots',
    component: PotsComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'membership',
    component: MembershipComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authenticationGuard]
  },
  {
    path: 'payment-done',
    component: PaymentDoneComponent,
    canActivate: [authenticationGuard]
  },

  // Default redirects
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
