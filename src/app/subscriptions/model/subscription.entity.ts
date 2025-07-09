export class Subscription {
  constructor(
    public id?: string,
    public uid?: string,
    public subscriptionId?: string,
    public planType?: SubscriptionPlanType,
    public status?: SubscriptionStatus,
    public startDate?: Date,
    public endDate?: Date,
    public cancelledAt?: Date
  ) {}

  get isActive(): boolean {
    return this.status === SubscriptionStatus.ACTIVE;
  }

  get isPremium(): boolean {
    return this.planType === SubscriptionPlanType.PREMIUM_MONTHLY ||
      this.planType === SubscriptionPlanType.PREMIUM_ANNUAL;
  }

  get daysRemaining(): number {
    if (!this.endDate) return 0;
    const now = new Date();
    const diffTime = this.endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  cancel(): void {
    this.status = SubscriptionStatus.CANCELLED;
    this.cancelledAt = new Date();
  }
}

export enum SubscriptionPlanType {
  FREE = 'FREE',
  PREMIUM_MONTHLY = 'PREMIUM_MONTHLY',
  PREMIUM_ANNUAL = 'PREMIUM_ANNUAL'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  PAUSED = 'PAUSED'
}

// Interfaces para las respuestas del backend
export interface SubscriptionData {
  id: string;
  uid: string;
  subscriptionId: string;
  planType: string;
  status: string;
  startDate: string;
  endDate?: string;
  cancelledAt?: string;
}

export interface SubscriptionStatusResponse {
  isPremium: boolean;
  subscription: SubscriptionData | null;
}

export interface SubscriptionCancelledResponse {
  cancelled: boolean;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export class CheckoutSubscriptionRequest {
  constructor(
    public email: string,
    public sku: string
  ) {}
}

export class CancelSubscriptionRequest {
  constructor(
    public uid: string
  ) {}
}
