import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public isAuthenticated: boolean = false;

  constructor() { }

  //Verifica si hay un token almacenado
  isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  //Verifica si el usuario esta autenticado
  getIsAuthenticated(): boolean {
    if(!this.isLogged()){
      return false
     }else {
      this.isAuthenticated = true;
     }
    return this.isAuthenticated;
  }


//Almacena el Token en el localStorage del navegador
  setToken(accessToke: string): void {
    localStorage.setItem('accessToke', accessToke);
    console.log('accessToke', accessToke);
  }

//Obtiene el token del navegador
  getToken(): string {
    return localStorage.getItem('accessToke')!;
  }


//Extrae el nombre del token
  getUserNameFromToken(): string | null{
    const nombreToke = this.getToken();

    if(!this.isLogged()){
     return null
    }

    const payload = nombreToke.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const name =  valuesJson.name;
    return name;
  }

  //Extrae el id del token
  getUserIdFromToken(): string | null{
    const idToke = this.getToken();

    if(!this.isLogged()){
     return null
    }

    const payload = idToke.split('.')[1];
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const userId =  valuesJson.sub;
    console.log('id:', userId);
    return userId;
  }
}


