export interface SubscriptionStatusResponse {
  isPremium: boolean;
  subscription: SubscriptionData | null;
}

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

export interface SubscriptionCancelledResponse {
  cancelled: boolean;
}

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}
