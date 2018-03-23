export class UserSession {

  public signedIn?: boolean;
  public firstName?: string;
  public lastName?: string;
  public companies?: { id: number, tradeName: string }[];
  public username?: string;

  constructor(signedIn?: boolean,
              firstName?: string,
              lastName?: string,
              companies?: { id: number, tradeName: string }[],
              username?: string) {
    this.signedIn = signedIn || false;
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.companies = companies || [];
    this.username = username || null;
  }
}
