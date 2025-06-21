export interface Plan {
  sku: string;
  name: string;
  tag: string;
  subtitle: string;
  includes: string[];
  restrictions: string[];
}