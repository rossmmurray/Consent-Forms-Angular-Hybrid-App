
export class User {
  id: number;
  email: string;
  role: string;

  constructor(user_ID: number, email: string, role: string) {
    this.id = user_ID;
    this.email = email;
    this.role = role;
  }
}

