/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.entity';
import { TokenModel } from '../models/token-model.entity';
import { LoginUsuarioModel } from '../models/auth-model.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL: string = "http://localhost:3000/auth/";

  constructor(private httpClient: HttpClient) { }

  //=================================== Usuario
  login(dto: LoginUsuarioModel): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + 'login', dto);
  }

  registro(dto: UsuarioModel): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + 'nuevo', dto);
  }

  refresh(dto: TokenModel): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + 'refresh', dto);
  }

  public update(user_id: number, usuario: UsuarioModel): Observable<any> {
    return this.httpClient.patch<any>(`${this.API_URL}${user_id}`, usuario);
  }

  public delete(user_id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.API_URL}${user_id}`);
  }

  public detail(user_id: number): Observable<UsuarioModel> {
    return this.httpClient.get<UsuarioModel>(`${this.API_URL}${user_id}`);
  }

  public lista(): Observable<UsuarioModel[]> {
    return this.httpClient.get<UsuarioModel[]>(`${this.API_URL}`);
  }

}
