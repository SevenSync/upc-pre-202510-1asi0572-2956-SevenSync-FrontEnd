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
