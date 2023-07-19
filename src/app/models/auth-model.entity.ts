export class UserAuthModel {
  username: string;
  contrasenia: string;

  constructor(username: string, contrasenia: string) {
      this.username = username;
      this.contrasenia = contrasenia;
  }
}
