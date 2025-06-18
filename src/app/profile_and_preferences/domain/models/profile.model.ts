export interface Profile {
  firstName: string;
  lastName: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
}
export interface ProfileResponse {
  id: number;
  fullName: string;
  streetAddress: string;
  phoneNumber: string;
}
