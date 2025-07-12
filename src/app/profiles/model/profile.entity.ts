export class Profile {
  constructor(
    public id: number,
    public fullName: string,
    public streetAddress: string,
    public phoneNumber: string,
    public firstName?: string,
    public lastName?: string,
    public street?: string,
    public number?: string,
    public city?: string,
    public postalCode?: string,
    public country?: string,
    public countryCode?: string
  ) {}

  get displayAddress(): string {
    if (this.street && this.number && this.city) {
      return `${this.street} ${this.number}, ${this.city}`;
    }
    return this.streetAddress;
  }

  updateContactInfo(phoneNumber: string, streetAddress: string): void {
    this.phoneNumber = phoneNumber;
    this.streetAddress = streetAddress;
  }
}

export class CreateProfileRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public street: string,
    public number: string,
    public city: string,
    public postalCode: string,
    public country: string,
    public countryCode: string,
    public phoneNumber: string
  ) {}
}

export class UpdateProfileRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public street: string,
    public number: string,
    public city: string,
    public postalCode: string,
    public country: string,
    public countryCode: string,
    public phoneNumber: string
  ) {}
}

export interface ProfileResponse {
  id: number;
  fullName: string;
  streetAddress: string;
  phoneNumber: string;
}

export interface UserCreatedResponse {
  created: boolean;
}

export interface UserUpdatedResponse {
  updated: boolean;
}

export interface HasProfileResponse {
  hasProfile: boolean;
}
