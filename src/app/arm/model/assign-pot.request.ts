export class AssignPotToUserRequest {
  constructor(
    public potId: number,
    public name: string,
    public location: string,
    public status: number
  ) {}
}
