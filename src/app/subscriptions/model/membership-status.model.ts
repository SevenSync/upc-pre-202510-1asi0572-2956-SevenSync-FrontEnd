
export type SubscriptionState = 'active'|'pending'|'canceled';

export interface MembershipStatus {
  planId: string;            // corresponde a sku
  status: SubscriptionState;
  startDate?: string;
  endDate?: string;
  daysRemaining?: number;
}