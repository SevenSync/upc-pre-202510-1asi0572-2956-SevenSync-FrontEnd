export class User {
  constructor(
    public uid: string,
    public email: string,
    public token?: string
  ) {}
}
