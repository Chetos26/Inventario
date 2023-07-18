export class UserAuthModel {
  email: string;
  contrasenia: string;

  constructor(email: string, contrasenia: string) {
      this.email = email;
      this.contrasenia = contrasenia;
  }
}
