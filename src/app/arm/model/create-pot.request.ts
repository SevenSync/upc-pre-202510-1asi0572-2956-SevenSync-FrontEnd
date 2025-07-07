export class CreatePotRequest {
  constructor(
    public name: string,
    public location: string,
    public status: number
  ) {}
}
