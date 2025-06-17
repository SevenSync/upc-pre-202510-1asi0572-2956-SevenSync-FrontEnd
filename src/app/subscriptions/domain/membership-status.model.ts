
export type MembershipState = 'active' | 'pending' | 'canceled';

export interface MembershipStatus {
  planId: string;
  status: MembershipState;
  startDate?: string;
  endDate?: string;
  daysRemaining?: number;
}