
export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  maxPots: number;
  features: string[];
}