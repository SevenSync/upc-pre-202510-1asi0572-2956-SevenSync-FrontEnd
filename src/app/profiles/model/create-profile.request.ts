export class CreateProfileRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public street: string,
    public buildingNumber: string,
    public city: string,
    public postalCode: string,
    public country: string,
    public countryCode: string,
    public phoneNumber: string
  ) {}
}
