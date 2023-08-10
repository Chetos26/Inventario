export class LoginUsuarioModel {
  password = '';
  email = '';


  constructor(email: string, password: string) {
    this.password = password;
    this.email = email
  }
}
